import { Router } from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
  findUserById,
  forgotPassword,
  resetPassword,
} from "../controllers/auth.controller.js";
import { authValidator } from "../middlewares/auth.middleware.js";

export const authRouter = Router();

// 1. Register user
authRouter.post("/register", registerUser);
// 2. Login user
authRouter.post("/login", loginUser);
// 3. Logout user
authRouter.post("/logout/:id", authValidator, logoutUser);
// 5. Find user by id
authRouter.get("/user/:id", findUserById);
// 6. Forgot password
authRouter.post("/forgot-password", forgotPassword);
// 7. Reset password
authRouter.post("/reset-password/:resetPasswordToken", resetPassword);
