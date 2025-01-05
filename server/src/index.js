import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import bodyParser from "body-parser"
import { connectDb } from "./db/connectDb.js"
import authRoutes from "./routes/auth.routes.js"
import testRoutes from "./routes/test.routes.js"
import pdfRoutes from "./routes/upload.route.js"



dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

const port = process.env.PORT;

await connectDb();

app.use("/auth",authRoutes);
app.use("/tests",testRoutes);
app.use("/pdf",pdfRoutes);

app.listen(port, ()=> {
    console.log(`App is listening at port: ${port}`);
});
