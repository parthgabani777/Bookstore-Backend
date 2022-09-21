import express from "express";
import {
    loginController,
    signupController,
} from "../controller/auth.controller.js";
import { asyncHandler } from "./util.js";

export const authRouter = express.Router();

authRouter.post("/signup", asyncHandler(signupController));
authRouter.post("/login", asyncHandler(loginController));
