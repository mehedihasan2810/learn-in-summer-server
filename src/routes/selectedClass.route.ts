import express from "express";
import { addSelectedClass, getSelectedClass, getSelectedClassIds } from "../controllers/selectedClass.controller";

const selectedClassRouter = express.Router();

selectedClassRouter.post("/addSelectedClass", addSelectedClass);
selectedClassRouter.get("/getSelectedClassIds", getSelectedClassIds);
selectedClassRouter.get("/getSelectedClass", getSelectedClass);

export { selectedClassRouter };
