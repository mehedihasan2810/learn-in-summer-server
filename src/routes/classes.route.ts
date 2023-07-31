import express from "express";
import {
  addClass,
  allClasses,
  deleteClass,
  getClass,
  updateClass,
} from "../controllers/classes.controller";

const classesRouter = express.Router();

classesRouter.get("/allClasses", allClasses);
classesRouter.get("/getClass/:id", getClass);
classesRouter.post("/addClass", addClass);
classesRouter.put("/updateClass/:id", updateClass);
classesRouter.delete("/deleteClass/:id", deleteClass);

export { classesRouter };
