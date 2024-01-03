import express from "express";
import {
  addSelectedClass,
  deleteSelectedClass,
  getSelectedClass,
  getSelectedClassIds,
} from "../controllers/selectedClass.controller";
import { verifyJWT } from "../middlewares/verifyJWT";

// Creating an Express Router instance
const selectedClassRouter = express.Router();

// Defining routes and associating them with corresponding controller functions
selectedClassRouter.post("/addSelectedClass", addSelectedClass);
selectedClassRouter.get("/getSelectedClassIds", getSelectedClassIds);
selectedClassRouter.get("/getSelectedClass", verifyJWT, getSelectedClass);
selectedClassRouter.delete(
  "/deleteSelectedClass",
  verifyJWT,
  deleteSelectedClass
);

export { selectedClassRouter };
