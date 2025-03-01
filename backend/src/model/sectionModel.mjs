import mongoose from "mongoose";

const sectionSchema = new mongoose.Schema({
  name: { type: String, required: true },
  teacher: { type: mongoose.Schema.Types.ObjectId, ref: "Teacher" },
  students: [
    {
      _id: mongoose.Schema.Types.ObjectId, // Store student ID
      name: String, 
      qrCode: String 
    }
  ]
});

const sectionModel = mongoose.model("Section", sectionSchema);

export default sectionModel;