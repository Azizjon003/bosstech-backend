import express from "express";
import cors from "cors";
import messageRoute from "../routes/messages.routes.js";
import rateLimit  from "express-rate-limit";
import morgan from "morgan";
const app = express();

const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 10, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})

// Apply the rate limiting middleware to all requests
app.use(limiter)
app.use(morgan("dev"));
app.use(
  cors({
    origin: "*",
    methods: ["POST", "GET"],
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/v1", messageRoute);
export default app;
