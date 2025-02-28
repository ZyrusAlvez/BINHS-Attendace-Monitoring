import teacherController from "../controller/teacherController.mjs";
import express from "express";

const teacherRouter = express.Router();

teacherRouter.post("/register", teacherController.registerUser);
teacherRouter.post("/log-in", teacherController.loginUser);
teacherRouter.post("/log-out", teacherController.logout);
teacherRouter.get("/check-auth", teacherController.checkAuth);

export default teacherRouter;
