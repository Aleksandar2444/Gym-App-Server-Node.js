import { NotFound } from "../errors/error.js";
import { GAf_000015, GAf_000016 } from "../errors/error.codes.js";
import { Post } from "../models/post.model.js";
// 1. Get posts by user
export const getPostByUserService = async (user) => {
  try {
    const posts = (
      await user.populate({
        path: "posts",
        options: { sort: { createdAt: "desc" } },
      })
    ).posts;
    return posts;
  } catch (error) {
    throw new NotFound(GAf_000015, `ERROR: ${error}`);
  }
};
// 2. Get comments by user
export const getCommentsByUserService = async (user) => {
  try {
    const comments = (await user.populate("comments")).comments;
    return comments;
  } catch (error) {
    throw new NotFound(GAf_000016, `ERROR: ${error}`);
  }
};
// 3. Get comments by post
export const getCommentsByPostService = async (postId) => {
  try {
    const commentsByPost = await Post.findById(postId)
      .populate("author", "firstName lastName gymNickname")
      .populate({
        path: "comments",
        populate: {
          path: "author",
          select: "firstName lastName gymNickname",
        },
      });
    console.log("s", commentsByPost);
    return commentsByPost;
  } catch (error) {
    console.log(error);
  }
};
