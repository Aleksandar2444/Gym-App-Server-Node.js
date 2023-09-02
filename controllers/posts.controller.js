import {
  createPostService,
  deletePostService,
  getAllPostsService,
  getPostByIdService,
  likePostService,
  updatePostService,
} from "../services/posts.service.js";
import { GAs_000006, GAf_000006, GAf_000005 } from "../errors/error.codes.js";

// 1. Get all posts
export const getAllPosts = async (req, res, next) => {
  try {
    try {
      const posts = await getAllPostsService();
      return res.status(200).send(posts);
    } catch (error) {
      res.sendStatus(404);
    }
  } catch (error) {
    res.status(500).send({ message: GAf_000006 });
  }
};
// 2. Get post by id
export const getPostById = async (req, res, next) => {
  try {
    const postId = req.params.id;
    if (!postId) return res.sendStatus(403);

    try {
      const post = await getPostByIdService(postId);
      res.status(200).send(post);
    } catch (error) {
      res.sendStatus(404);
    }
  } catch (error) {
    res.status(500).send({ message: GAf_000006 });
  }
};
// 3. Create post
export const createPost = async (req, res, next) => {
  try {
    const user = req.user;

    const postData = req.body;
    if (!postData) return res.sendStatus(403);

    try {
      const createdPost = await createPostService(user, postData);
      res.status(201).send({
        message: GAs_000006,
        postId: createdPost._id,
      });
    } catch (error) {
      res.status(403).send(error);
    }
  } catch (error) {
    res.status(500).send({ message: GAf_000005 });
  }
};
// 4. Update post
export const updatePost = async (req, res, next) => {
  try {
    const user = req.user;

    const postId = req.params.id;
    if (!postId) return res.sendStatus(403);

    try {
      const updateData = req.body;
      if (!updateData) return res.sendStatus(403);

      await updatePostService(user, postId, updateData);
      res.sendStatus(204);
    } catch (error) {
      res.status(403).send(error);
    }
  } catch (error) {
    res.status(500).send({ message: GAf_000005 });
  }
};
// 5. Delete post
export const deletePost = async (req, res, next) => {
  try {
    const user = req.user;

    const postId = req.params.id;
    if (!postId) return res.sendStatus(403);

    try {
      await deletePostService(user, postId);
      res.sendStatus(204);
    } catch (error) {
      res.status(403).send(error);
    }
  } catch (error) {
    res.status(500).send({ message: GAf_000005 });
  }
};
// 6. Like post
export const likePost = async (req, res, next) => {
  try {
    const postId = req.params.id;
    if (!postId) return res.sendStatus(403);

    try {
      const likeCount = await likePostService(postId);
      res.status(200).send(likeCount);
    } catch (error) {
      res.status(403).send(error);
    }
  } catch (error) {
    res.status(500).send({ message: GAf_000005 });
  }
};
