import express from "express";
import { addUser, getUser, getUsers } from "../controllers/user.controller";

const userRouter = express.Router();

userRouter.post("/addUser", addUser);
userRouter.get("/getUsers", getUsers);
userRouter.get("/getUser", getUser);

export { userRouter };
