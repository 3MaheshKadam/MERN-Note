import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./router/user.router.js";

dotenv.config();

mongoose
  .connect(process.env.URL)
  .then(() => {
    console.log("Connected to MongoDB!");
  })
  .catch((err) => {
    console.log(err);
  });
const app = express();

app.use("/api/user", userRouter);
app.use(express.json());

app.listen(3000, () => {
  console.log("server is running on port no 3000");
});
