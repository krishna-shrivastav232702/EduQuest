import express,{Router} from "express"
import { createReminder } from "../controllers/reminder.controller.js";

const router:Router = express.Router();

router.post("/:userId",createReminder);

export default router;