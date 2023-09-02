import { Router } from "express";
import {
  createPost,
  deletePost,
  getAllPosts,
  getPostById,
  likePost,
  updatePost,
} from "../controllers/posts.controller.js";

export const postsRouter = Router();

// 1. Get all posts
postsRouter.get("/", getAllPosts);
// 2. Get post by id
postsRouter.get("/:id", getPostById);
// 3. Create post
postsRouter.post("/", createPost);
// 4. Update post
postsRouter.patch("/edit/:id", updatePost);
// 5. Delete post
postsRouter.delete("/:id", deletePost);
// 6. Like post
postsRouter.patch("/:id/like", likePost);
