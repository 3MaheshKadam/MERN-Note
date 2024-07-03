import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./router/user.router.js";
import authRouter from "./router/auth.router.js";
import cookieParser from "cookie-parser";

dotenv.config();

mongoose
  .connect(process.env.URL)
  .then(() => {
    console.log("Connected to MongoDB!");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });
const app = express();
app.use(express.json());
app.use(cookieParser());

app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);

app.listen(3000, () => {
  console.log("server is running on port no 3000");
});

// Error handling middleware
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal server error";
  console.error("Error middleware caught:", err);
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
