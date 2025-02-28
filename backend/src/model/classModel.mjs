import mongoose from "mongoose";

const classSchema = new mongoose.Schema(
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

const classModel = mongoose.model("Class", classSchema);

export default classModel;
