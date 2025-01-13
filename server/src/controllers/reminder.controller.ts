import { Request,Response } from "express"
import { prismaClient } from "../index.js";

export const createReminder = async(req:Request,res:Response)=>{
    const {userId}=req.params;
    const {testDate}=req.body;

    try{
        const reminderDate = new Date(testDate);
        reminderDate.setDate(reminderDate.getDate()-1);

        const reminder = await prismaClient.reminder.create({
            data:{
                userId,
                testDate:reminderDate,
            }
        })
        if(!reminder){
            res.status(400).json({message:"Reminder not created"});
        }
        res.status(200).json({message:"Reminder Created Successfully"});
    }catch(err){
        console.error(err);
        res.status(500).json({message:"Internal Server Error"});
    }
}