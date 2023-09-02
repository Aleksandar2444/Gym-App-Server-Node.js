import { Router } from "express";
import {
  getCommentsByPost,
  getCommentsByUser,
  getPostByUser,
} from "../controllers/users.controller.js";

export const usersRouter = Router();

// 1. Get posts by user
usersRouter.get("/posts", getPostByUser);
// 2. Get comments by user
usersRouter.get("/comments", getCommentsByUser);
// 3. Get comments by post
usersRouter.get("/comments-by-post/:id", getCommentsByPost);
