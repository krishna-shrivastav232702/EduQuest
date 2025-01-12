import express, { Router } from "express"
import {generatePreSignedUrl} from "../utils/awsServices/generatePresignedUrl.js"
import { generateSignedUrlForGetOb } from "../utils/awsServices/generateSignedUrlForGetOb.js";
import { geminiIntegrationToSavePdf } from "../controllers/upload.controller.js";

const router:Router = express.Router();

router.post("/getPresignedUrl",generatePreSignedUrl);
router.post("/getSignedUrlForGetObj",generateSignedUrlForGetOb);
router.post("/gemini",geminiIntegrationToSavePdf);

export default router;
