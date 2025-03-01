import express from "express";
import sectionController from "../controller/sectionController.mjs";

const sectionRouter = express.Router();

sectionRouter.post("/create", sectionController.createSection);
sectionRouter.get("/:id", sectionController.getSectionById);
sectionRouter.put("/update/:id", sectionController.updateSection);
sectionRouter.delete("/delete/:id", sectionController.deleteSection);

export default sectionRouter;