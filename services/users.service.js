import { NotFound } from "../errors/error.js";

// 1. Get posts by user
export const getPostByUserService = async (user) => {
  try {
    const posts = (await user.populate("posts")).posts;
    return posts;
  } catch (error) {
    throw new NotFound(`Couldn't get user's posts, ERROR: ${error}`);
  }
};
// 2. Get comments by user
export const getCommentsByUserService = async (user) => {
  try {
    const comments = (await user.populate("comments")).comments;
    return comments;
  } catch (error) {
    throw new NotFound(`Couldn't get user's comments, ERROR: ${error}`);
  }
};
