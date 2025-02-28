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

  // Add students to a class
  addStudents: async (req, res) => {
    try {
      const { students } = req.body;
      const sectionData = await sectionModel.findByIdAndUpdate(
        req.params.id,
        { $push: { students: { $each: students } } },
        { new: true }
      );

      if (!sectionData) {
        return res.status(404).json({ message: "section not found" });
      }

      res.status(200).json(sectionData);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Remove students from a section
  removeStudents: async (req, res) => {
    try {
      const { students } = req.body;
      const sectionData = await sectionModel.findByIdAndUpdate(
        req.params.id,
        { $pull: { students: { $in: students } } }, // Remove students from the array
        { new: true }
      );

      if (!sectionData) {
        return res.status(404).json({ message: "section not found" });
      }

      res.status(200).json(sectionData);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

};

export default sectionController;