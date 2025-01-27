import express,{Router} from "express";
import { getDashboardOverview,getPerformanceOverTime,getUpcomingReminders } from "../controllers/dashboard.controller.js";

const router:Router = express.Router();

router.get("/overview/:userId",getDashboardOverview);
router.get("/performance/:userId",getPerformanceOverTime);
router.get("/reminders/:userId",getUpcomingReminders);

export default router;