import express, { Router } from "express"
import {generatePreSignedUrl} from "../utils/aws services/generatePresignedUrl.js"
// import { uploadPdf } from "../controllers/upload.controller.js";

const router:Router = express.Router();

// router.post("/upload",uploadPdf);
router.post("/getPresignedUrl",generatePreSignedUrl);
// router.post("/extract",extractPdf);

export default router;
