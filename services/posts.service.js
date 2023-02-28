import { BadRequest, GeneralError, NotFound } from "../errors/error.js";
import { Post } from "../models/post.model.js";

// 1. Get all posts
export const getAllPostsService = async () => {
  try {
    const posts = await Post.find({})
      .populate("author", "firstName lastName")
      .sort({
        createdAt: "desc",
      });

    return posts;
  } catch (error) {
    throw new GeneralError(`Couldn't fetch posts, ERROR: ${error}`);
  }
};
// 2. Get post by id
export const getPostByIdService = async (postId) => {
  try {
    const findPost = await Post.findById(postId)
      .populate("author", "firstName lastName")
      .populate({
        path: "comments",
        populate: {
          path: "author",
          select: "firstName lastName",
        },
      });

    if (!findPost) throw "Post not found";

    return findPost;
  } catch (error) {
    throw new NotFound(`Couldn't fetch post, ERROR: ${error}`);
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
    throw new BadRequest(`Couldn't create post, ERROR: ${error}`);
  }
};
// 4. Update post
export const updatePostService = async (user, postId, updateData) => {
  try {
    const post = await Post.findOne({ _id: postId, author: user._id });
    if (!post) throw "Post not found";

    const allowedUpdates = ["title", "body"];

    const updateKeys = Object.keys(updateData);
    updateKeys.forEach((key) => {
      if (allowedUpdates.includes(key)) {
        post[key] = updateData[key];
      }
    });

    await post.save();
  } catch (error) {
    throw new BadRequest(`Couldn't update post, ERROR: ${error}`);
  }
};
// 5. Delete post
export const deletePostService = async (user, postId) => {
  try {
    const deletePost = await Post.findByIdAndDelete({
      _id: postId,
      author: user._id,
    });

    // Making sure references list is updated with each deletion
    user.posts = user.posts.filter((postId) => deletePost._id !== postId);
    if (!deletePost) throw "Post not found!";
  } catch (error) {
    throw new NotFound(`Couldn't delete post, ERROR: ${error}`);
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
    throw new BadRequest(`Couldn't like post, ERROR: ${error}`);
  }
};
