import express from "express";
import {
  addClass,
  allClasses,
  deleteClass,
  getAInstructorClasses,
  getClass,
  getSingleClass,
  updateApproveStatus,
  updateClass,
  updateDenyStatus,
  updateFeedback,
} from "../controllers/classes.controller";
import { verifyJWT } from "../middlewares/verifyJWT";

// Creating an Express Router instance
const classesRouter = express.Router();

// Defining routes and associating them with corresponding controller functions
classesRouter.get("/allClasses", allClasses);
classesRouter.get("/getClass/:id", getClass);
classesRouter.post("/addClass", addClass);
classesRouter.put("/updateClass/:id", updateClass);
classesRouter.delete("/deleteClass/:id", verifyJWT, deleteClass);
classesRouter.get("/getSingleClass/:id", getSingleClass);
classesRouter.put("/updateApproveStatus/:id", updateApproveStatus);
classesRouter.put("/updateDenyStatus/:id", updateDenyStatus);
classesRouter.put("/updateFeedback/:id", updateFeedback);
classesRouter.get("/getAInstructorClasses", getAInstructorClasses);

export { classesRouter };
