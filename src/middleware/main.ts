import express from "express";
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
const limitRequestsByIP = (req, res, next) => {
  const ipAddress = req.ip; // Foydalanuvchi IP manbasini olish
  const maxRequests = 10; // Maksimal so'rovlarni belgilash
  const windowMs = 15 * 60 * 1000; // Davom etadigan vaqt (15 daqiqa)

  // IP manbasiga asoslangan cheklov obyektini yaratish
  if (!req.rateLimit) {
    req.rateLimit = {};
  }

  // IP manbasiga asoslangan cheklov ma'lumotlarini tekshirish
  if (!req.rateLimit[ipAddress]) {
    req.rateLimit[ipAddress] = {
      count: 1, // Tekshirilgan so'rovlar soni
      resetTime: Date.now() + windowMs, // Cheklovni tiklash vaqti
    };
  } else {
    req.rateLimit[ipAddress].count++; // So'rovlar sonini oshirish

    // Cheklov vaqtini tekshirish
    if (req.rateLimit[ipAddress].count > maxRequests) {
      const timeLeft = Math.ceil(
        (req.rateLimit[ipAddress].resetTime - Date.now()) / 1000
      );
      return res
        .status(429)
        .send(
          `So'rovlar cheklov orqali chegaralangan. Iltimos, ${timeLeft} soniya kutib turing.`
        );
    }
  }

  // Cheklovga yetmagan so'rovlarni davom ettirish
  next();
};

// Middleware funksiyani ro'yxatga olish
app.use(limitRequestsByIP);

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
