import nodemailer from "nodemailer"
import dotenv from "dotenv"
import { compileTestReminderTemplate } from "./testReminderTemplate.js";

dotenv.config();

interface test{
    userEmail:string;
    userName:string;
    testDate:Date;
}


const transporter = nodemailer.createTransport({
    service:'gmail',
    host:'smtp.gmail.com',
    port:587,
    secure:false,
    auth:{
        user:process.env.APP_EMAIL,
        pass:process.env.APP_PASS
    }
});

export const sendEmail = async({userEmail,userName,testDate}:test) =>{
    try{
        let emailContent;
        let subject;
        emailContent = compileTestReminderTemplate({
            userName:userName,
            testDate:testDate.toLocaleString(),
        });
        subject = "Test Reminder"
        const info = await transporter.sendMail({
            from:'"TestPrep Team" <noreply@testprep.com>',
            to:userEmail,
            subject:subject,
            html:emailContent
        });
        console.log("Email sent successfully");
    }catch(error){
        console.error("Failed to send mail");
        throw error;
    }
}

