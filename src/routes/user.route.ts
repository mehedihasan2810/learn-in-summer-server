import express from "express";
import {
  addUser,
  getUser,
  getUsers,
  updateUserRole,
} from "../controllers/user.controller";

// Creating an Express Router instance
const userRouter = express.Router();

// Defining routes and associating them with corresponding controller functions
userRouter.post("/addUser", addUser);
userRouter.get("/getUsers", getUsers);
userRouter.get("/getUser", getUser);
userRouter.put("/updateUserRole/:id", updateUserRole);

export { userRouter };
