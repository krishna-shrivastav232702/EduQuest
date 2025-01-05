import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import bodyParser from "body-parser"
import { connectDb } from "./db/connectDb.js"
import authRoutes from "./routes/auth.routes.js"



dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

const port = process.env.PORT;


app.use("/auth",authRoutes);
app.use("/tests",testRoutes);
app.use("/notifications",reminderRoutes);
app.use("/pdf",pdfRoutes);




connectDb();

