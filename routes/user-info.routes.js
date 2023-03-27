import { Router } from "express";
import { updateUserProfile } from "../controllers/user-profile.controller.js";

export const userInfoRouter = Router();

// 1. Update user profile
userInfoRouter.patch("/edit/:id", updateUserProfile);
