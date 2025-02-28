import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema({
  student: {
    type: String,
    required: true,
  },
  section: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Section",
    required: true,
  },
  status: {
    type: String,
    enum: ["Present", "Absent", "Late", "Excused"],
    required: true,
  },
});

const attendanceModel = mongoose.model("Attendance", attendanceSchema);

export default attendanceModel;