import express from "express";
import {
  addSelectedClass,
  deleteSelectedClass,
  getSelectedClass,
  getSelectedClassIds,
} from "../controllers/selectedClass.controller";
import { verifyJWT } from "../middlewares/verifyJWT";

const selectedClassRouter = express.Router();

selectedClassRouter.post("/addSelectedClass", addSelectedClass);
selectedClassRouter.get("/getSelectedClassIds", getSelectedClassIds);
selectedClassRouter.get("/getSelectedClass", verifyJWT, getSelectedClass);
selectedClassRouter.delete(
  "/deleteSelectedClass",
  verifyJWT,
  deleteSelectedClass
);

export { selectedClassRouter };
