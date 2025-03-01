import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
  name: String,
  section: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "Section" 
    },
  qrCode: {
    type: String,
    required: true,
  },
});

const studentModel = mongoose.model("Student", studentSchema);

export default studentModel;