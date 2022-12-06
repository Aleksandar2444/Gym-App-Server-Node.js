import { Router } from "express";
import { AuthController } from "../controllers/auth.controller.js";
import { authValidator } from "../middlewares/auth.middleware.js";

export const authRouter = Router();

// 1. Register user
authRouter.post("/register", AuthController.registerUser);
// 2. Login user
authRouter.post("/login", AuthController.loginUser);
// 3. Logout user
authRouter.post("/logout", authValidator, AuthController.logoutUser);
// 4. Logout all
authRouter.post("/logout-all", authValidator, AuthController.logoutAll);
