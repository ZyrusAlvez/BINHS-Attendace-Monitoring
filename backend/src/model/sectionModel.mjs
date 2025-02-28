import mongoose from "mongoose";

const sectionSchema = new mongoose.Schema(
  {
  name: { 
    type: String, 
    required: true 
  },
  teacher: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Teacher" 
  },
  students: [
    { type: String }
  ], 
  }
);

const sectionModel = mongoose.model("Section", sectionSchema);

export default sectionModel;
