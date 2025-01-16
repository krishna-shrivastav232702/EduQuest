import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
import { Request, Response } from "express";
import { prismaClient } from "../index.js";

dotenv.config();

const apikey = process.env.GEMINI_API_KEY || "";

// Define expected structure
interface ProcessedQuestion {
    question: string;
    options: string[];
    answer: string;
    explanation: string;
}

const processingQuestions = async (rawText: string | undefined): Promise<ProcessedQuestion[]> => {
    if (!rawText) {
        throw new Error("No text provided for processing");
    }

    // First, clean the input text
    const cleanedText = rawText
        .replace(/\r\n/g, '\n')  // Normalize line endings
        .replace(/\n{3,}/g, '\n\n')  // Remove excessive newlines
        .trim();

    // Split into question blocks more reliably
    const questionBlocks = cleanedText.split(/Question(?:\s+\d+)?:/i).filter(Boolean);

    const processedQuestions = questionBlocks.map((block): ProcessedQuestion => {
        try {
            // Extract question text
            // Look for text until the first option or any variation of "Option A" appears
            const questionMatch = block.match(/^\s*(.*?)(?=\s*(?:-\s*Option\s*A:|Option\s*A[\s:-]|-\s*[A-D][.\s:-]|\n\s*-\s*|$))/is);
            const question = questionMatch
                ? questionMatch[1]
                    .replace(/\*\*/g, '')
                    .replace(/\n+/g, ' ')
                    .trim()
                : '';

            // Extract options more robustly
            const optionsPattern = /(?:Option\s*([A-D])[.\s:-]|\n\s*-\s*|\n\s*([A-D])[.\s:-])\s*([^\n]+)/gi;
            const options: string[] = [];
            let optionMatch;

            while ((optionMatch = optionsPattern.exec(block)) !== null) {
                const optionText = optionMatch[3].trim();
                if (optionText) {
                    options.push(optionText);
                }
            }

            // If no options found with labels, try extracting lines starting with "-"
            if (options.length === 0) {
                const bulletOptions = block.match(/(?:\n\s*-\s*)([^\n]+)/g);
                if (bulletOptions) {
                    options.push(...bulletOptions.map(opt => opt.replace(/^\s*-\s*/, '').trim()));
                }
            }

            // Extract answer
            // Look for various formats of answer specification
            const answerMatch = block.match(/(?:Answer\s*[:=-]\s*|Correct\s+Answer\s*[:=-]\s*)([A-D])/i);
            let answer = answerMatch ? answerMatch[1].trim() : '';

            // If no letter answer found, try to match the correct option text
            if (!answer && options.length > 0) {
                const correctOptionMatch = block.match(/(?:Answer\s*[:=-]\s*|Correct\s+Answer\s*[:=-]\s*)([^\n]+)/i);
                if (correctOptionMatch) {
                    const correctText = correctOptionMatch[1].trim();
                    const optionIndex = options.findIndex(opt =>
                        opt.toLowerCase().includes(correctText.toLowerCase()) ||
                        correctText.toLowerCase().includes(opt.toLowerCase())
                    );
                    if (optionIndex !== -1) {
                        const letters = ['A', 'B', 'C', 'D'];
                        answer = letters[optionIndex];
                    }
                }
            }

            // Extract explanation
            // Look for various formats of explanation specification
            const explanationMatch = block.match(/(?:Explanation\s*[:=-]\s*|Reason\s*[:=-]\s*)([^]*?)(?=(?:\n\s*Question|$))/i);
            const explanation = explanationMatch
                ? explanationMatch[1]
                    .replace(/\*\*/g, '')
                    .replace(/\n+/g, ' ')
                    .trim()
                : '';

            // Validate the processed question
            if (!question || options.length === 0 || !answer) {
                console.warn('Incomplete question block:', {
                    hasQuestion: !!question,
                    optionsCount: options.length,
                    hasAnswer: !!answer,
                    rawBlock: block
                });
            }

            return {
                question,
                options: options.slice(0, 4), // Ensure we only take first 4 options
                answer,
                explanation
            };
        } catch (error) {
            console.error('Error processing question block:', error);
            console.error('Problematic block:', block);
            return {
                question: '',
                options: [],
                answer: '',
                explanation: ''
            };
        }
    });

    // Filter out invalid questions
    return processedQuestions.filter(q =>
        q.question &&
        q.options.length === 4 &&
        q.answer &&
        ['A', 'B', 'C', 'D'].includes(q.answer)
    );
};

// Update your generate test function to handle empty results
export const generateTest = async (req: Request, res: Response) => {
    try {
        const { text, userId } = req.body;
        if (!userId) {
            res.status(404).json({ message: "user id is required" });
        }

        const newTest = await prismaClient.test.create({
            data: { userId }
        });

        if (!newTest) {
            res.status(500).json({ message: "Internal server error while creating test" });
        }

        const testId = newTest.id;
        const genAI = new GoogleGenerativeAI(apikey);
        const model = genAI.getGenerativeModel({
            model: "gemini-1.5-flash",
            systemInstruction: `You are an advanced AI tutor designed to help students by generating multiple-choice questions from textbook or PDF content. Your task is to read and understand the given text and create 10 relevant and challenging multiple-choice questions. Each question must strictly follow this format:
        Question: [Question text here]
        Option A: [Option text]
        Option B: [Option text]
        Option C: [Option text]
        Option D: [Option text]
        Answer: [A, B, C, or D]
        Explanation: [Provide a direct and concise explanation for why the correct answer is correct. Focus only on the scientific principles, definitions, or logical reasoning relevant to the answer. Do not reference the text explicitly or use phrases like "the text states," "the text defines," or "as mentioned in the text."]
        Ensure each question has exactly 4 options labeled A through D, and the answer must be one of these letters.`
        });

        const result = await model.generateContent(`Here is the content: ${text}`);

        if (!result?.response?.candidates?.[0]?.content?.parts?.[0]?.text) {
            await prismaClient.test.delete({ where: { id: testId } });
            res.status(400).json({ message: "Failed to generate questions" });
        }

        const questions = await processingQuestions(result.response.candidates?.[0]?.content.parts[0]?.text);

        if (!questions || questions.length === 0) {
            await prismaClient.test.delete({ where: { id: testId } });
            res.status(400).json({ message: "No valid questions were generated" });
        }

        const createQuestions = questions.map(question =>
            prismaClient.question.create({
                data: {
                    questionText: question.question,
                    options: question.options,
                    correctAnswer: question.answer,
                    explanation: question.explanation,
                    testId,
                }
            })
        );

        await Promise.all(createQuestions);
        res.status(200).json({ message: "Test generated successfully", testId });

    } catch (error) {
        console.error("Error generating test:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};


export const submitTest = async (req: Request, res: Response) => {
    try {
        const { userAnswers, score } = req.body;
        const { userId, testId } = req.params;
        try {
            await prismaClient.testPerformance.create({
                data: {
                    userId,
                    testId,
                    score,
                }
            })

            for (const answer of userAnswers) {
                await prismaClient.question.update({
                    where: { id: answer.questionId },
                    data: { userAnswer: answer.userAnswer },
                });
            }

            res.status(200).json({ message: "Test performance saved successfully!" });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Failed to save test performance" });
        }

    } catch (error) {
        console.error("Error submitting test:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const testResult = async (req: Request, res: Response) => {
    try {
        const { testId } = req.params;
        if (!testId) {
            res.status(400).json({ message: "Test id is required" });
        }
        const test = await prismaClient.test.findUnique({
            where: { id: testId },
            include: {
                questions: true,
                testPerformance: true,
            }
        })
        if (!test) {
            res.status(404).json({ message: "Test not found" });

        }
        res.status(200).json({ message: "Test result fetched", test });
    } catch (error) {
        console.error("Error fetching test result:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const findTestQuestions = async (req: Request, res: Response) => {
    const { testId } = req.params;
    try {
        if (!testId) {
            res.status(400).json({ message: "Test id is required" });
        }
        const testquestions = await prismaClient.question.findMany({ where: { testId: testId } });
        if (!testquestions) {
            res.status(404).json({ message: "Test not found" })
        }
        res.status(200).json({ testquestions });
    } catch (error) {
        console.error("Internal server error");
        res.status(500).json({ message: "Internal Server Error" });
    }
}