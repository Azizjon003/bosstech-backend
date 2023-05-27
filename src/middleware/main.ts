import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import messageRoute from "../routes/messages.routes.js";
import rateLimit from "express-rate-limit";
import morgan from "morgan";
const app = express();

// const limiter = rateLimit({
//   windowMs: 15 * 60 * 1000, // 15 minutes
//   max: 10, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
//   standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
//   legacyHeaders: false, // Disable the `X-RateLimit-*` headers
// });

// Apply the rate limiting middleware to all requests
// app.use(limiter);
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 daqiqa davomida
  max: 10, // 15 daqiqada maksimal 100 ta so'rovga chegaralash
  keyGenerator: function (req) {
    return req.ip; // Foydalanuvchi IP manbasini cheklov kaliti sifatida olib kelish
  },
  handler: function (req, res) {
    res.status(429).send('So\'rovlaringiz cheklov orqali chegaralangan');
  },
});

// Middleware funksiyani ro'yxatga olish
app.use(limiter);

// Middleware funksiyani ro'yxatga olish
// app.use(limitRequestsByIP);

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
