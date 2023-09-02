import {
  createCommentService,
  getAllCommentsService,
} from "../services/comments.service.js";
import { GAs_000005, GAf_000005 } from "../errors/error.codes.js";

// 1. Get all comments
export const getAllComments = async (req, res, next) => {
  try {
    const comments = await getAllCommentsService();
    if (!comments) return res.sendStatus(403);

    res.status(200).send(comments);
  } catch (error) {
    res.status(500).send({ message: GAf_000005 });
  }
};
// 2. Create a comment
export const createComment = async (req, res, next) => {
  try {
    const user = req.user;
    if (!user) return res.sendStatus(403);

    const commentData = req.body;
    if (!commentData) return res.sendStatus(403);

    try {
      const createdComment = await createCommentService(user, commentData);

      res.status(201).send({
        message: GAs_000005,
        postId: createdComment.post,
      });
    } catch (error) {
      res.status(400).send(error);
    }
  } catch (error) {
    res.status(500).send({ message: GAf_000005 });
  }
};
