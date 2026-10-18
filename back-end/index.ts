import express, { type Request, type Response } from 'express';
import { connection } from './src/db.js';
import cors from "cors";
import { router } from "./src/routes.js"
import cookieParser from "cookie-parser";

const app = express();
app.set("trust proxy", 1);
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: process.env.FRONTEND_URL ?? "http://localhost:5173",
    credentials: true,
}));
app.use(router);

connection();

const PORT = Number(process.env.PORT) || 3000;

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});