import {
  getCommentsByUserService,
  getPostByUserService,
} from "../services/users.service.js";

// 1. Get post by user
export const getPostByUser = async (req, res, next) => {
  try {
    const user = req.user;
    if (!user) return res.sendStatus(403);

    try {
      const posts = await getPostByUserService(user);
      res.status(200).send(posts);
    } catch (error) {
      res.status(403).send(error);
    }
  } catch (error) {
    res.status(500).send(error);
  }
};
// 2. Get comments by user
export const getCommentsByUser = async (req, res, next) => {
  try {
    const user = req.user;
    if (!user) return res.sendStatus(403);

    try {
      const comments = await getCommentsByUserService(user);
      res.status(200).send(comments);
    } catch (error) {
      res.status(403).send(error);
    }
  } catch (error) {
    res.status(500).send(error);
  }
};
