import { Router } from "express";
import { AuthController } from "../controllers/auth.controller.js";
import { authValidator } from "../middlewares/auth.middleware.js";

export const authRouter = Router();

// 1. Register user
authRouter.post("/register", AuthController.registerUser);
// 2. Login user
authRouter.post("/login", AuthController.loginUser);
// Refresh token
authRouter.post("/refresh-token", AuthController.refreshAccessToken);
// 3. Logout user
authRouter.post("/logout", authValidator, AuthController.logoutUser);
// 4. Logout all
authRouter.post("/logout-all", authValidator, AuthController.logoutAll);
// 5. Find user by id
authRouter.get("/user/:id", AuthController.findUserById);
