import dotenv from "dotenv"
import { Request, Response } from "express"
import { S3Client,GetObjectCommand,PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";


dotenv.config();

export const generatePreSignedUrl = async(req:Request,res:Response)=>{
    try {
        const {filename,contentType} = req.body;
        const s3Client = new S3Client({
            region:process.env.AWS_REGION,
            credentials:{
                accessKeyId:process.env.AWS_ACCESS_KEY_ID ||'',
                secretAccessKey:process.env.AWS_SECRET_ACCESS_KEY || ''
            }
        });


        const command = new PutObjectCommand({
            Bucket:process.env.AWS_BUCKET_NAME || "",
            Key:`bucket1/${filename}`,
            ContentType:contentType
        });

        const url = await getSignedUrl(s3Client,command);
        res.status(200).json({url});
        
            // const command = new GetObjectCommand({
            //     Bucket:process.env.AWS_BUCKET_NAME || "",
            //     Key:'image1.jpg' //image name is required to get the object in the url 
            // });
            // const url = await getSignedUrl(s3Client,command);
            // console.log(url);
            // res.status(200).json({url});
         

    } catch (error) {
        console.log(error);
    }
};
