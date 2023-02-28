import { Router } from "express";
import { authRouter } from "../routes/auth.routes.js";
import { postsRouter } from "../routes/posts.routes.js";
import { commentsRouter } from "../routes/comments.routes.js";
import { usersRouter } from "../routes/users.routes.js";

import { authValidator } from "../middlewares/auth.middleware.js";

export const globalRouter = Router();

// 1. Auth router
globalRouter.use("/auth", authRouter);
// 2. Posts router
globalRouter.use("/posts", authValidator, postsRouter);
// 3. Comments router
globalRouter.use("/comments", authValidator, commentsRouter);
// 4. User router
globalRouter.use("/user", authValidator, usersRouter);
