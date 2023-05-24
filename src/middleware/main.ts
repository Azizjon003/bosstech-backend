import express from "express";
import { Request, Response, NextFunction } from "express";
import messageRoute from "../routes/messages.routes";
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/v1", messageRoute);
export default app;
