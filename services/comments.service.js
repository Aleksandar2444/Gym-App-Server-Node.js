import { BadRequest, GeneralError } from "../errors/error.js";
import { Comment } from "../models/comment.model.js";
import { getPostByIdService } from "./posts.service.js";
import { GAf_000007, GAf_000008 } from "../errors/error.codes.js";

// 1. Get all comments
export const getAllCommentsService = async () => {
  try {
    const comments = await Comment.find({})
      .populate("author", "firstName lastName gymNickname")
      .sort({
        createdAt: "desc",
      });

    return comments;
  } catch (error) {
    throw new GeneralError(GAf_000007, `ERROR: ${error}`);
  }
};
// 2. Create a comment
export const createCommentService = async (user, commentData) => {
  try {
    const post = await getPostByIdService(commentData.post);

    const comment = new Comment({ ...commentData, author: user._id });
    const createdComment = await comment.save();

    post.comments.push(createdComment._id);
    user.comments.push(createdComment._id);

    await post.save();
    await user.save();

    return createdComment;
  } catch (error) {
    throw new BadRequest(GAf_000008, `ERROR: ${error}`);
  }
};
