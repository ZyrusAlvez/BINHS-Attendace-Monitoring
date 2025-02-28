import express from "express";
import attendanceController from "../controller/attendanceController.mjs";

const attendanceRouter = express.Router();

attendanceRouter.post("/mark", attendanceController.markAttendance);
attendanceRouter.get("/section/:sectionId", attendanceController.getAttendanceBySection);

export default attendanceRouter;
