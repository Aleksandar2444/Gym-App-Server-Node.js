import {
  getCommentsByUserService,
  getPostByUserService,
  getCommentsByPostService,
} from "../services/users.service.js";
import { GAf_000005 } from "../errors/error.codes.js";

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
    res.status(500).send({ message: GAf_000005 });
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
    res.status(500).send({ message: GAf_000005 });
  }
};
// 3. Get comments by post
export const getCommentsByPost = async (req, res) => {
  try {
    const postId = req.params.id;
    console.log("c1", postId);

    try {
      const commentsByPost = await getCommentsByPostService(postId);
      console.log("c2", commentsByPost);
      res.status(200).send(commentsByPost);
    } catch (error) {
      console.log(error);
    }
  } catch (error) {
    console.log(error);
  }
};
