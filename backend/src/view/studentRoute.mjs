import express from "express";
import studentController from "../controller/studentController.mjs";
import sectionController from "../controller/sectionController.mjs";

const studentRouter = express.Router();

studentRouter.post("/create/:id", studentController.createStudent, sectionController.addStudents);
studentRouter.get("/all", studentController.getAllStudents);
studentRouter.get("/:id", studentController.getStudentById);
studentRouter.put("/update/:id", studentController.updateStudent);
studentRouter.delete("/delete/:id/:sectionId", studentController.deleteStudent, sectionController.removeStudents);

export default studentRouter;