import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

import teacherRouter from "./view/teacherRoute.mjs";
import sectionRouter from "./view/sectionRoute.mjs";
import studentRouter from "./view/studentRoute.mjs";

dotenv.config();

const PORT = process.env.PORT
const DATABASE = process.env.DATABASE
const app = express();

app.use(express.json());
app.use(cookieParser()); // Add this middleware to parse cookies
app.use(
  cors({
    origin: true,
    credentials: true, // Required for sending cookies
  })
);



app.use("/api/teacher", teacherRouter)
app.use("/api/section", sectionRouter)
app.use("/api/student", studentRouter)

mongoose
  .connect(DATABASE)
  .then(() => {
    console.log("connected to database")

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });

  })
  .catch((error) => {
    console.log("Database connection error:", error)
  })