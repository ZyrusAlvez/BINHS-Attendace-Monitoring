import mongoose from "mongoose";

const sectionSchema = new mongoose.Schema({
  name: { type: String, required: true },
  teacher: { type: mongoose.Schema.Types.ObjectId, ref: "Teacher" },
  students: [
    {
      _id: mongoose.Schema.Types.ObjectId,
      name: String, 
      qrCode: String,
      attendance: [{
        status: {
          type: String,
          enum: ["Present", "Absent", "Late", "Excused"],
          default : "",
          required: false,
        },
        date: {
          type: String,
          required: false,
        },
        }
      ] 
    }
  ]
});

const sectionModel = mongoose.model("Section", sectionSchema);

export default sectionModel;