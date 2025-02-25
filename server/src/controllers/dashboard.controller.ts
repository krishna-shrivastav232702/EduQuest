import { Request,Response } from "express"
import { prismaClient } from "../index.js";

export const getDashboardOverview = async(req:Request,res:Response)=>{
    try {
        const {userId}=req.params;
        const tests = await prismaClient.test.findMany({
            where:{userId},
            include:{testPerformance:true},
        })

        const totalTests = tests.length;

        const scores = tests.flatMap((test)=>test.testPerformance.map((p)=>p.score));
        const averageScore = scores.reduce((sum,score)=>sum+score,0)/scores.length || 0;
        const highestScore = Math.max(...scores,0);
        
        res.status(200).json({totalTests,averageScore,highestScore});
    } catch (error) {
        res.status(500).json({error:"Failed to fetch dashboard overview"});
    }
}   

export const getPerformanceOverTime = async(req:Request,res:Response)=>{
    try {
        const {userId} = req.params;
        const performance = await prismaClient.testPerformance.findMany({
            where:{userId},
            select:{
                date:true,
                score:true,
            },
        });

        const data = performance.map((perf)=>({
            date:perf.date,
            score:perf.score,
        }));

        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({error:"Failed to fetch Performance"});
    }
};


export const getUpcomingReminders = async(req:Request,res:Response)=>{
    try {
        const {userId}=req.params;
        const reminders = await prismaClient.reminder.findMany({
            where:{
                userId,
                testDate:{
                    gte:new Date(),
                },
            },
            orderBy:{testDate:"asc"}
        })
        res.status(200).json(reminders);

    } catch (error) {
        res.status(500).json({error:"Failed to fetch reminders"});
    }
}