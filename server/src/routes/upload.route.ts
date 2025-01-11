import express, { Router } from "express"
import {generatePreSignedUrl} from "../utils/awsServices/generatePresignedUrl.js"
// import { uploadPdf } from "../controllers/upload.controller.js";
import { generateSignedUrlForGetOb } from "../utils/awsServices/generateSignedUrlForGetOb.js";

const router:Router = express.Router();

// router.post("/upload",uploadPdf);
router.post("/getPresignedUrl",generatePreSignedUrl);
router.post("/getSignedUrlForGetObj",generateSignedUrlForGetOb);
// router.post("/extract",extractPdf);

export default router;
