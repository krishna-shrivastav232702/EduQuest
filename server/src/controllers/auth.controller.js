import User from "../models/auth.model.js"
import bcryptjs from "bcryptjs"
import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie.js";
import { sendVerificationEmail } from "../utils/sendVerificationEmail.js";

export const signup = async(req,res)=>{
    const {name,email,password,city,state}=req.body;
    try {
        if(!name || !email || !password){
            res.status(400).json({message:"Enter all fields"});
            return ;
        }
        const userAlreadyExists = await User.findOne({email});
        if(userAlreadyExists){
            res.status(409).json({message:"user already exists"});
            return ;
        }
        const hashedPassword = await bcryptjs.hash(password,10);
        const verificationToken = generateVerificationCode();

        const user = new User({
            email,
            name,
            password:hashedPassword,
            city,
            state,
            verificationToken,
            verificationTokenExpiresAt: new Date(Date.now()+3*60*60*1000),
        })
        await user.save();

        const token = generateTokenAndSetCookie(res,user._id);
        const result = await sendVerificationEmail(user.name, user.email, verificationToken);
        console.log(`Email sent successfully : ${result}`);

        res.status(201).json({
            message: "User Created Successfully",
            user: { name: user.name, email: user.email, city: user.city, state: user.state, _id: user._id },
            token
        });

    } catch (error) {
        console.error("something went wrong in the server");
        res.status(500).json({ message: "Internal Server Error" });
        return;
    }
};

export const login = async(req,res)=>{

}

export const logout = async(req,res)=>{

}

export const profile = async(req,res)=>{
    
}