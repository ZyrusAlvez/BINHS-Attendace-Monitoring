import attendanceModel from "../model/attendanceModel.mjs";

const attendanceController = {
  // Mark attendance
  markAttendance: async (req, res) => {
    try {
      const { student, section, status } = req.body;

      const today = new Date();
      const attendanceDate = `${today.getMonth() + 1}-${today.getDate()}-${today.getFullYear()}`

      // Check if an attendance record exists for the same student, section, and date
      const existingAttendance = await attendanceModel.findOne({
        student,
        section,
        date: attendanceDate
      });
  
      if (existingAttendance) {
        // If status is different, update the record
        if (existingAttendance.status !== status) {
          existingAttendance.status = status;
          await existingAttendance.save();
          return res.status(200).json({ message: "Attendance updated", attendance: existingAttendance });
        }
        return res.status(200).json({ message: "Attendance already recorded with the same status", attendance: existingAttendance });
      }
  
      // If no existing record, create a new one
      const attendance = new attendanceModel({ student, section, status, date: attendanceDate });
      await attendance.save();
  
      res.status(201).json({ message: "Attendance recorded", attendance });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Get attendance records for a section
  getAttendanceBySection: async (req, res) => {
    try {
      const { sectionId } = req.params;
      const attendanceRecords = await attendanceModel.find({ section: sectionId }).populate("section");

      res.status(200).json(attendanceRecords);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

};

export default attendanceController;