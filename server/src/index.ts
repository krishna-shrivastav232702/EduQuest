import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import bodyParser from "body-parser"
import authRoutes from "./routes/auth.routes.js"
import testRoutes from "./routes/test.routes.js"
import pdfRoutes from "./routes/upload.route.js";
import morgan from "morgan"
import { Express } from "express"
import { PrismaClient } from "@prisma/client"


dotenv.config({path:'./.env'});

const port = Number(process.env.PORT)|| 5000;
const envMode = process.env.NODE_ENV?.trim() || "DEVELOPMENT";

const app:Express = express();

app.use(express.json());
app.use(bodyParser.json());
app.use(cors({
    origin:'*',
    credentials:true
}));
app.use(morgan('dev'));

export const prismaClient = new PrismaClient({});

app.use("/auth",authRoutes);
app.use("/tests",testRoutes);
app.use("/pdf",pdfRoutes);

app.listen(port, ()=> {
    console.log(`App is listening at port: ${port} and in ${envMode} mode`);
});
