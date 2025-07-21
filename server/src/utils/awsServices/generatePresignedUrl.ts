import dotenv from "dotenv"
import { Request, Response } from "express"
import { S3Client,GetObjectCommand,PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { prismaClient } from "../../index.js";


dotenv.config();

export const generatePreSignedUrl = async(req:Request,res:Response):Promise<void>=>{
    try {
        const {filename,contentType,userId,fileSize} = req.body;
        console.log("filename",filename);
        console.log("contentType",contentType);
        console.log("userId",userId);
        console.log("fileSize",fileSize);
        if(!filename || !contentType || !userId || !fileSize){
            res.status(400).json({error:"missing required fields"});
            return;
        }


        const s3Client = new S3Client({
            region:process.env.AWS_REGION,
            credentials:{
                accessKeyId:process.env.AWS_ACCESS_KEY_ID ||'',
                secretAccessKey:process.env.AWS_SECRET_ACCESS_KEY || ''
            }
        });
        const s3Key =`bucket1/${filename}_${Date.now()}`; 

        const command = new PutObjectCommand({
            Bucket:process.env.AWS_BUCKET_NAME || "",
            Key:s3Key,
            ContentType:contentType
        });

        const url = await getSignedUrl(s3Client,command);

        const UploadedFile = await prismaClient.file.create({
            data:{
                userId,
                originalName:filename,
                s3Key,
                contentType,
                fileSize
            }
        })
        res.status(200).json({url,UploadedFile});
        return;
            // const command = new GetObjectCommand({
            //     Bucket:process.env.AWS_BUCKET_NAME || "",
            //     Key:'image1.jpg' //image name is required to get the object in the url 
            // });
            // const url = await getSignedUrl(s3Client,command);
            // console.log(url);
            // res.status(200).json({url});
         

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error" });
    }
};
