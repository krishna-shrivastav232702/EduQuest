import { Request,Response } from "express"
import {GoogleGenerativeAI} from "@google/generative-ai"
import dotenv from "dotenv"

dotenv.config();

const apikey = process.env.GEMINI_API_KEY || "";

export const geminiIntegration = async(req:Request,res:Response)=>{
    try {
        const {text}=req.body;
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
        res.status(200).json({result});

    } catch (error) {
        console.error(error);
        res.status(500).json({message:"Internal Server Error"});
    }
}