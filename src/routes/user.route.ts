import express from "express";
import {
  addUser,
  getUser,
  getUsers,
  updateUserRole,
} from "../controllers/user.controller";

const userRouter = express.Router();

userRouter.post("/addUser", addUser);
userRouter.get("/getUsers", getUsers);
userRouter.get("/getUser", getUser);
userRouter.put("/updateUserRole/:id", updateUserRole);

export { userRouter };
