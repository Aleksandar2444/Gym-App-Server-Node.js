import { Router } from "express";
import { authRouter } from "../routes/auth.routes.js";

export const globalRouter = Router();

// 1. Auth router
globalRouter.use("/auth", authRouter);
