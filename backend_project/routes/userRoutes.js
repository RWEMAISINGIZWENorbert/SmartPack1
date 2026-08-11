import express from "express";
import { register, login } from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.post("/signup", register);
userRouter.post("/signin", login);

export default userRouter;