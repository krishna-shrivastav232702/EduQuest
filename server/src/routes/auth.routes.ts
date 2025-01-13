import express, { Router } from "express"
import { signup,login,logout,profile, verifyEmail } from "../controllers/auth.controller.js";

const router:Router = express.Router();

router.post("/signup",signup);
router.post("/login",login);
router.post("/logout",logout);
router.get("/me",profile);
router.put("/verifyEmail/:userId",verifyEmail);

export default router;
