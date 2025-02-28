import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT
const DATABASE = process.env.DATABASE
const app = express();

app.use(express.json());

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