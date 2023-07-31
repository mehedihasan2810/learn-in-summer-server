import express from "express";
import { getUser } from "../controllers/user.controller";

export const userRouter = express.Router();

userRouter.get("/getUser", getUser);
