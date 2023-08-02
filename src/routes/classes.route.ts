import express from "express";
import {
  addClass,
  allClasses,
  deleteClass,
  getClass,
  getSingleClass,
  updateClass,
} from "../controllers/classes.controller";
import { verifyJWT } from "../middlewares/verifyJWT";

const classesRouter = express.Router();

classesRouter.get("/allClasses", allClasses);
classesRouter.get("/getClass/:id", getClass);
classesRouter.post("/addClass", addClass);
classesRouter.put("/updateClass/:id", updateClass);
classesRouter.delete("/deleteClass/:id", verifyJWT, deleteClass);
classesRouter.get("/getSingleClass/:id", getSingleClass);

export { classesRouter };
