import { Request,Response } from "express"
import {GoogleGenerativeAI} from "@google/generative-ai"
import dotenv from "dotenv"
import { prismaClient } from "../index.js";

dotenv.config();

const apikey = process.env.GEMINI_API_KEY || "";
export const generateTest = async(req:Request,res:Response)=>{
    try {
        const {text,userId}=req.body;
        if(!userId){
            res.status(404).json({message:"user id is required"});
            return;
        }
        const newTest = await prismaClient.test.create({
            data:{
                userId,
            }
        });
        if(!newTest){
            res.status(500).json({message:"Internal server error while creating test"})
        }
        const testId = newTest.id;



        const genAI = new GoogleGenerativeAI(apikey);
        const model = genAI.getGenerativeModel({
            model:"gemini-1.5-flash",
            systemInstruction :`You are an advanced AI tutor designed to help students by generating multiple-choice questions from textbook or PDF content. Your task is to read and understand the given text and create 10 relevant and challenging multiple-choice questions, each with 4 options and an answer key in the following format:

            Question:
            - Option A
            - Option B
            - Option C
            - Option D
            Answer: [Correct Answer]
            Explanation: [Provide a direct and concise explanation for why the correct answer is correct. Focus only on the scientific principles, definitions, or logical reasoning relevant to the answer. Do not reference the text explicitly or use phrases like "the text states," "the text defines," or "as mentioned in the text."]`
        });

        const inputText = `
            Here is the content 
            ${text}
        `;    

        const result = await model.generateContent(inputText);
        if(!result){
            res.status(400).json({message:"Something went wrong in api response"});
        }
        const ans = result.response.candidates?.[0].content.parts?.[0].text
        const questions = await processingQuestions(ans);
        if(!questions || questions.length === 0){
            res.status(400).json({message:"No questions were generated"});
            return;
        }
        const createQuestions = questions.map((question) => 
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
        res.status(200).json({message:"test generated successfully",testId});
    } catch (error) {
        console.error("Error generating test:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

const processingQuestions = async(ans:string | undefined) =>{
    const questionBlocks = ans?.split("Question:");
    const questions =  questionBlocks?.slice(1).map((block)=>{
        const rawquestion = block.match(/^(.*?)(?=\n- Option A)/s)?.[1]?.trim() || "";
        const question = rawquestion
                            .replace(/\*\*/g,"")
                            .replace(/\n+/g," ")
                            .trim();
        const options = (block.match(/- (.*?)\n/g) || []).map(option => option.replace('- ',"").trim());
        const answer = block.match(/Answer:\s*([A-D])/)?.[1]?.trim() || "";
        const explanation = block.match(/Explanation:\s*(.*)/)?.[1]?.trim() || "";
        return {
            question,
            options,
            answer,
            explanation,
        };
    });

    return questions;
}



export const submitTest = async(req:Request,res:Response)=>{
    try {
        const {answers} = req.body;
        const {userId,testId}=req.params;
        if(!testId || !answers){
            res.status(404).json({message:"Test Id and answers are required"});
        }

        const questions = await prismaClient.question.findMany({where:{testId}});

        if(!questions || questions.length === 0){
            res.status(404).json({message:"Questions not found"});
        }

        let score = 0;
        const questionUpdates = questions.map((question)=>{
            const userAnswer = answers[question.id];
            const isCorrect = userAnswer === question.correctAnswer;
            if(isCorrect) score++;
            return prismaClient.question.update({
                where:{id:question.id},
                data:{
                    userAnswer,
                    status:isCorrect ? "correct" : "incorrect",
                }
            })
        })

        await Promise.all(questionUpdates);

        await prismaClient.testPerformance.create({
            data:{
                userId,
                testId,
                score,
            }
        });

        res.status(200).json({ message: "Test submitted successfully", score });

    } catch (error) {
        console.error("Error submitting test:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const testResult = async(req:Request,res:Response)=>{
    try {
        const {testId}=req.params;
        if(!testId){
            res.status(400).json({message:"Test id is required"});
        }
        const test = await prismaClient.test.findUnique({
            where:{id:testId},
            include:{
                questions:true,
                testPerformance:true,
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

export const findTestQuestions = async(req:Request,res:Response)=>{
    const {testId}=req.params;
    try {
        if(!testId){
            res.status(400).json({message:"Test id is required"});
        }
        const testquestions = await prismaClient.question.findMany({where: {testId:testId}});
        if(!testquestions){
            res.status(404).json({message:"Test not found"})
        }
        res.status(200).json({testquestions});
    } catch (error) {
        console.error("Internal server error");
        res.status(500).json({message:"Internal Server Error"});
    }
}