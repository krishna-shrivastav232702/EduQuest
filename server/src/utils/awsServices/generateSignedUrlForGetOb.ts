import { GetObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { Request, Response } from "express";

export const generateSignedUrlForGetOb =async(req:Request,res:Response)=>{
    const {s3Key} = req.body;
    try {
        const s3Client = new S3Client({
            region:process.env.AWS_REGION || "",
            credentials:{
                accessKeyId:process.env.AWS_ACCESS_KEY_ID || '',
                secretAccessKey:process.env.AWS_SECRET_ACCESS_KEY || ""
            }
        });

        const command = new GetObjectCommand({
            Bucket:process.env.AWS_BUCKET_NAME || "",
            Key:s3Key
        })

        const url = await getSignedUrl(s3Client,command);
        res.status(200).json({url});
    } catch (error) {
        console.error(error);
        res.status(500).json({message:"Error while getting signed url for Getting Objects"});
    }
}