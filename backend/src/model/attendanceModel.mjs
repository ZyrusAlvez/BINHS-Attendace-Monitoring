import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema({
  student: {
    type: String,
  },
  section: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Section",
    required: true,
  },
  date: { type: Date, default: Date.now },
  status: {
    type: String,
    enum: ["Present", "Absent", "Late", "Excused"],
    required: true,
  },
});

const attendanceModel = mongoose.model("Attendance", attendanceSchema);

export default attendanceModel;