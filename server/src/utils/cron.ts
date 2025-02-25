import cron from "node-cron"
import { prismaClient } from "../index.js"
import { sendEmail } from "./sendEmail.js";

cron.schedule("* * * * *",async()=>{
    try {
        console.log("cron job triggered");
        const now = new Date();
        
        const startOfToday = new Date(now);
        startOfToday.setHours(0, 0, 0, 0);
        
        const endOfTomorrow = new Date(now);
        endOfTomorrow.setDate(now.getDate() + 1);
        endOfTomorrow.setHours(23, 59, 59, 999);
        
        console.log(`Checking for reminders between ${startOfToday.toISOString()} and ${endOfTomorrow.toISOString()}`);
        const reminders = await prismaClient.reminder.findMany({
            where:{
                testDate:{
                    gte:startOfToday,
                    lte:endOfTomorrow,
                },
                emailSent:false,
            },
            include:{
                user:true
            }
        });
        console.log(reminders);
        for(const reminder of reminders){
            const user = await prismaClient.user.findFirst({where:{id:reminder.userId}});
            if(!user){
                continue;
            }
            console.log(`Sending email to user ${user.email}`);
            await sendEmail({
                userEmail:user.email,
                userName:user.name,
                testDate:reminder.testDate,
            });
            console.log("Email sent successfully");
            await prismaClient.reminder.update({
                where:{id:reminder.id},
                data:{
                    emailSent:true
                }
            });
            console.log("Updated successfully");
        }
    } catch (error) {
        console.error(`Failed to send email , Error:`, error);
        throw error;
    }
})