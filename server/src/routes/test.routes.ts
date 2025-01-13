import express, { Router } from "express"
import { generateTest,submitTest,testResult,findTestQuestions } from "../controllers/test.controller.js";

const router:Router = express.Router()

router.post("/generate",generateTest);
router.put("/:testId/:userId/submit",submitTest);
router.get("/:testId/results",testResult);
router.get('/:testId',findTestQuestions);

export default router;