import sectionModel from "../model/sectionModel.mjs";

const sectionController = {
  // Create a new class
  createSection: async (req, res) => {
    try {
      const { name, teacher, students } = req.body;

      const newClass = await sectionModel.create({
        name,
        teacher,
        students: students || [],
      });

      res.status(201).json(newClass);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Get a Section by ID
  getSectionById: async (req, res) => {
    try {
      const sectionData = await sectionModel.findById(req.params.id)

      if (!sectionData) {
        return res.status(404).json({ message: "section not found" });
      }

      res.status(200).json(sectionData);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Update Section details
  updateSection: async (req, res) => {
    try {
      const updatedClass = await sectionModel.findByIdAndUpdate(req.params.id, req.body, { new: true });

      if (!updatedClass) {
        return res.status(404).json({ message: "section not found" });
      }

      res.status(200).json(updatedClass);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Delete a class
  deleteSection: async (req, res) => {
    try {
      const deletedClass = await sectionModel.findByIdAndDelete(req.params.id);

      if (!deletedClass) {
        return res.status(404).json({ message: "section not found" });
      }

      res.status(200).json({ message: "section deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Add a single student to a section
  addStudents: async (req, res) => {
    try {
      const student = req.student; // Get student object from req
      if (!student) return res.status(400).json({ message: "Student is required" });
      const sectionData = await sectionModel.findByIdAndUpdate(
        req.params.id,
        { 
          $push: { 
            students: { _id: student._id, name: student.name, qrCode: student.qrCode } 
          } 
        },
        { new: true }
      );
  
      if (!sectionData) return res.status(404).json({ message: "Section not found" });
  
      res.status(200).json(sectionData);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  
  removeStudents: async (req, res) => {
    try {
      const student = req.student; // Get student object from middleware
      if (!student) return res.status(400).json({ message: "Student is required" });
  
      const sectionData = await sectionModel.findByIdAndUpdate(
        req.params.sectionId, // Use the correct section ID
        { $pull: { students: { _id: student._id } } }, // Remove by _id
        { new: true }
      );
  
      if (!sectionData) return res.status(404).json({ message: "Section not found" });
  
      res.status(200).json({ message: `Student ${student.name} removed from section`, sectionData });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }  
  
};

export default sectionController;