import { Router } from "express";
import {
  createComment,
  getAllComments,
} from "../controllers/comments.controller.js";

export const commentsRouter = Router();

// 1. Get all comment
commentsRouter.get("/", getAllComments);
// 2. Create comment
commentsRouter.post("/", createComment);
