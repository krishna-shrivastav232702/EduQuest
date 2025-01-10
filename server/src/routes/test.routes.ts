import express, { Router } from "express"
import { generateTest,startTest,submitTest,testResult } from "../controllers/test.controller.js";

const router:Router = express.Router()

router.post("/generate",generateTest);
router.get("/:testId",startTest);
router.put("/:testId/submit",submitTest);
router.get("/:testId/results",testResult);

export default router;