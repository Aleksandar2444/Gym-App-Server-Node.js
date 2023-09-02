import { BadRequest, GeneralError, NotFound } from "../errors/error.js";
import {
  GAf_000009,
  GAf_000010,
  GAf_000011,
  GAf_000012,
  GAf_000013,
  GAf_000014,
} from "../errors/error.codes.js";
import { Post } from "../models/post.model.js";

// 1. Get all posts
export const getAllPostsService = async () => {
  try {
    const posts = await Post.find({})
      .populate("author", "firstName lastName gymNickname")
      .sort({
        createdAt: "desc",
      });

    return posts;
  } catch (error) {
    throw new GeneralError(GAf_000009, `ERROR: ${error}`);
  }
};
// 2. Get post by id
export const getPostByIdService = async (postId) => {
  try {
    const findPost = await Post.findById(postId)
      .populate("author", "firstName lastName gymNickname")
      .populate({
        path: "comments",
        populate: {
          path: "author",
          select: "firstName lastName gymNickname",
        },
        options: { sort: { createdAt: "desc" } },
      });

    if (!findPost) throw GAf_000010;

    return findPost;
  } catch (error) {
    throw new NotFound(GAf_000009, `ERROR: ${error}`);
  }
};
// 3. Create post
export const createPostService = async (user, postData) => {
  try {
    const { title, body } = postData;

    const post = new Post({ title, body, author: user._id });

    const createdPost = await post.save();

    user.posts.push(createdPost._id);
    await user.save();

    return createdPost;
  } catch (error) {
    throw new BadRequest(GAf_000011, `ERROR: ${error}`);
  }
};
// 4. Update post
export const updatePostService = async (user, postId, updateData) => {
  try {
    const post = await Post.findOne({ _id: postId, author: user._id });
    if (!post) throw GAf_000010;

    const allowedUpdates = ["title", "body"];

    const updateKeys = Object.keys(updateData);
    updateKeys.forEach((key) => {
      if (allowedUpdates.includes(key)) {
        post[key] = updateData[key];
      }
    });

    await post.save();
  } catch (error) {
    throw new BadRequest(GAf_000012, `ERROR: ${error}`);
  }
};
// 5. Delete post
export const deletePostService = async (user, postId) => {
  try {
    const deletePost = await Post.findByIdAndDelete({
      _id: postId,
      author: user._id,
    });

    if (!deletePost) throw GAf_000010;
  } catch (error) {
    throw new NotFound(GAf_000013, `ERROR: ${error}`);
  }
};
// 6. Like post
export const likePostService = async (postId) => {
  try {
    const post = await getPostByIdService(postId);
    post.likes += 1;

    const updatePost = await post.save();

    return { likes: updatePost.likes };
  } catch (error) {
    throw new BadRequest(GAf_000014, `ERROR: ${error}`);
  }
};
