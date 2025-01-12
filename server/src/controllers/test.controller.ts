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
            Explanation: [Explanation of the correct answer]`
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

export const startTest = async(req:Request,res:Response)=>{

}

export const submitTest = async(req:Request,res:Response)=>{

}

export const testResult = async(req:Request,res:Response)=>{
    
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