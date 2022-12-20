import { Router } from "express";
import { AuthController } from "../controllers/auth.controller.js";
import { authValidator } from "../middlewares/auth.middleware.js";

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
