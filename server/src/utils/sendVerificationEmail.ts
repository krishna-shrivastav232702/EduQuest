import dotenv from "dotenv"
import nodemailer from "nodemailer"
import Handlebars from "handlebars"

dotenv.config();

const email_template = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Verify Your Email - Prepify</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #ffffff; 
            color: #000000; 
            margin: 0;
            padding: 0;
        }
        .container {
            max-width: 600px;
            margin: 40px auto;
            background-color: #ffffff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
        }
        .header {
            text-align: center;
            padding-bottom: 20px;
        }
        .header h2 {
            color: #000000; 
            font-size: 24px;
        }
        .main-content {
            font-size: 16px;
            line-height: 1.5;
            color: #000000; 
        }
        .otp {
            font-size: 22px;
            font-weight: bold;
            color: #000000;
            text-align: center;
            margin: 20px 0;
        }
        .footer {
            text-align: center;
            font-size: 12px;
            color: #555555;
            margin-top: 30px;
        }
        .footer a {
            color: #000000;
            text-decoration: underline;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h2>Welcome to Prepify!</h2>
        </div>
        <div class="main-content">
            <p>Hello {{name}},</p>
            <p>Thank you for signing up with Prepify - your AI-powered educational assistant!</p>
            <p>To complete your registration, please use the One-Time Password (OTP) below to verify your email address:</p>
            <div class="otp">
                {{verificationToken}}
            </div>
            <p>This OTP is valid for the next 3 hours. If you didn't request this code, please ignore this email.</p>
            <p>If you encounter any issues or have questions, feel free to contact us at <a href="mailto:krishnashrivastava23@gmail.com">krishnashrivastava23@gmail.com</a>.</p>
        </div>
        <div class="footer">
            <p>&copy; 2025 Prepify. All rights reserved.</p>
        </div>
    </div>
</body>
</html>
`;


const template = Handlebars.compile(email_template);

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

export const sendVerificationEmail = async(name:string,email:string,verificationToken:string)=>{
    try {
        const htmlContent = template({name,verificationToken});
        const info = await transporter.sendMail({
            from:{
                name:'Prepify',
                address:process.env.APP_EMAIL || ""
            },
            to:[email],
            subject:"Verify Your Account - Code Expires in 3 Hours",
            text:`Your Verification Code: ${verificationToken}`,
            html:htmlContent,
        });

        console.log(`email sent: ${info.messageId}`)
        return info;

    } catch (error) {
        console.error("Error sending email: ",email);
        throw error;
    }
}