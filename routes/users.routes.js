import { Router } from "express";
import {
  getCommentsByUser,
  getPostByUser,
} from "../controllers/users.controller.js";

export const usersRouter = Router();

// 1. Get posts by user
usersRouter.get("/posts", getPostByUser);
// 2. Get comments by user
usersRouter.get("/comments", getCommentsByUser);
