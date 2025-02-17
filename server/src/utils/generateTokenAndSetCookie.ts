import { Response } from "express"
import jwt from "jsonwebtoken"

export const generateTokenAndSetCookie = (res:Response,userId:string):string=>{
    const token = jwt.sign({_id:userId},process.env.JWT_SECRET || "defaultSecret",{
        expiresIn:"7d",
    })

    res.cookie("token",token,{
        httpOnly:true,
        secure:process.env.NODE_ENV === "development",
        sameSite:"strict",
        maxAge:7*24*60*60*1000
    })
    return token;
}