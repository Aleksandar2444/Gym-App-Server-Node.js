import { Router } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import nodemailer from "nodemailer";
import { AuthController } from "../controllers/auth.controller.js";
import { authValidator } from "../middlewares/auth.middleware.js";
import { User } from "../models/user.model.js";
import { v4 as uuidv4 } from "uuid";

export const authRouter = Router();

// 1. Register user
authRouter.post("/register", AuthController.registerUser);
// 2. Login user
authRouter.post("/login", AuthController.loginUser);
// Refresh token
authRouter.post("/token", AuthController.accessToken);
// 3. Logout user
authRouter.post("/logout", authValidator, AuthController.logoutUser);
// 5. Find user by id
authRouter.get("/user/:id", AuthController.findUserById);
// 6. Forgot password
authRouter.post("/forgot-password", AuthController.forgotPassword);
// 7. Reset password
authRouter.post("/reset-password", AuthController.resetPassword);
