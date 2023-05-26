import express from "express";
import cors from "cors";
import messageRoute from "../routes/messages.routes.js";
import morgan from "morgan";
const app = express();
app.use(morgan("dev"));
app.use(cors({
    origin: "*",
    methods: ["POST", "GET"],
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/v1", messageRoute);
export default app;
