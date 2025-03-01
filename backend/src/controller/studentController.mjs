import QRCode from "qrcode";
import mongoose from "mongoose";
import studentModel from "../model/studentModel.mjs";

const studentController = {
  // Create a new student and generate QR code
  createStudent: async (req, res, next) => {
    try {
      const { name } = req.body;
      const _id = new mongoose.Types.ObjectId(); // Generate _id
      const qrCode = await QRCode.toDataURL(name);

      const newStudent = new studentModel({ _id, name, qrCode });
      await newStudent.save();

      req.student = newStudent; // Store student object for the next controller
      next(); // Move to addStudents
    } catch (error) {
      res.status(500).json({ message: "Error creating student", error });
    }
  },

  // Get all students
  getAllStudents: async (req, res) => {
    try {
      const students = await studentModel.find();
      res.json(students);
    } catch (error) {
      res.status(500).json({ message: "Error fetching students", error });
    }
  },

  // Get a single student by ID
  getStudentById: async (req, res) => {
    try {
      const student = await studentModel.findById(req.params.id);
      if (!student) return res.status(404).json({ message: "Student not found" });

      res.json(student);
    } catch (error) {
      res.status(500).json({ message: "Error fetching student", error });
    }
  },

  // Update student details and regenerate QR code
  updateStudent: async (req, res) => {
    try {
      const { name } = req.body;
      const qrCode = await QRCode.toDataURL(name);

      const updatedStudent = await studentModel.findByIdAndUpdate(
        req.params.id,
        { name, qrCode },
        { new: true }
      );

      if (!updatedStudent) return res.status(404).json({ message: "Student not found" });

      res.json(updatedStudent);
    } catch (error) {
      res.status(500).json({ message: "Error updating student", error });
    }
  },

  deleteStudent: async (req, res, next) => {
    try {
      const deletedStudent = await studentModel.findByIdAndDelete(req.params.id);
      if (!deletedStudent) return res.status(404).json({ message: "Student not found" });
  
      req.student = deletedStudent; // Pass the full object
      next(); // Proceed to removeStudents
    } catch (error) {
      res.status(500).json({ message: "Error deleting student", error });
    }
  }
};

export default studentController;
