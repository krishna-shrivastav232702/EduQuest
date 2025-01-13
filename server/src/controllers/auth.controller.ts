import bcryptjs from "bcryptjs"
import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie.js";
import { sendVerificationEmail } from "../utils/sendVerificationEmail.js";
import {generateVerificationCode} from "../utils/generateVerificationCode.js"
import { Request,Response } from "express";
import { prismaClient } from "../index.js";


export const signup = async(req:Request,res:Response):Promise<void>=>{
    const {name,email,password,city,state}=req.body;
    try {
        if(!name || !email || !password){
            res.status(400).json({message:"Enter all fields"});
            return ;
        }
        const userAlreadyExists = await prismaClient.user.findFirst({where:{email}});
        if(userAlreadyExists){
            res.status(409).json({message:"user already exists"});
            return ;
        }
        const hashedPassword = await bcryptjs.hash(password,10);
        const verificationToken = generateVerificationCode();

        const user = await prismaClient.user.create({
            data:{
            email,
            name,
            password:hashedPassword,
            city,
            state,
            verificationToken,
            verificationTokenExpiresAt: new Date(Date.now()+3*60*60*1000),
        }})

        const token = generateTokenAndSetCookie(res,user.id.toString());
        const result = await sendVerificationEmail(user.name, user.email, verificationToken);
        console.log(`Email sent successfully : ${result}`);

        res.status(201).json({
            message: "User Created Successfully",
            user: { name: user.name, email: user.email, city: user.city, state: user.state, _id: user.id },
            token
        });

    } catch (error) {
        console.error("something went wrong in the server");
        res.status(500).json({ message: "Internal Server Error" });
        return;
    }
};

export const login = async(req:Request,res:Response)=>{
    const { email, password } = req.body;
    try {
        const user = await prismaClient.user.findFirst({ where:{email} });
        if (!user) {
            res.status(404).json({ message: "User doesnt exists" });
            return;
        }

        const isPasswordValid = await bcryptjs.compare(password, user.password);
        if (!isPasswordValid) {
            res.status(400).json({ message: "Invalid Credentials" });
            return;
        }

        const token = generateTokenAndSetCookie(res, user.id.toString());

        res.status(200).json({
            success: true,
            message: "Logged in successfully",
            user: {
                ...user,
                password: undefined,
            },
            token,
        });
    } catch (error) {
        console.log("Error in login");
        res.status(500).json({ message: "Internal server error while user login " });
        return;
    }
}

export const logout = async(req:Request,res:Response)=>{
    try {
        res.clearCookie("token", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "development",
            sameSite: "strict",
            maxAge: 0
        });

        res.status(200).json({
            success: true,
            message: "Logged Out Successfully"
        })
    } catch (error) {
        console.log("Error during Logout")
        res.status(500).json({ message: "Internal Server Error" });
        return;
    }
}

export const profile = async(req:Request,res:Response)=>{
    const {userId} = req.params;
    try{
        const user = await prismaClient.user.findFirst(
            {
                where:{id:userId},
                select:{
                    id:true,
                    name:true,
                    email:true,
                    reminders:true,
                    tests:true,
                    testPerformance:true,
                    files:true
                }
            });
        if(!user){
            res.status(404).json({message:"User Doesnt exist"});
        }
        

    }catch(error){

    }
}

export const verifyEmail = async(req:Request,res:Response)=>{
    const {userId} = req.params;
    try {
        const user = await prismaClient.user.update(
            {
                where:{id:userId},
                data:{
                    isVerified:true
                }        
            });
        if(!user){
            res.status(404).json({message:"User doesnt exist"});
        }
        res.status(200).json({message:"User Verified Successfully",user});

    } catch (error) {
        console.error("Internal Server Error");
        res.status(500).json({message:"Internal server error while updating user"});
    }
}