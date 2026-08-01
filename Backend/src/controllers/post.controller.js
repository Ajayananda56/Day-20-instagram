const postModel = require("../models/post.model");
const ImageKit = require("@imagekit/nodejs");
const { toFile } = require("@imagekit/nodejs");
const jwt = require("jsonwebtoken");
const likeModel = require("../models/like.model");

const imagekit = new ImageKit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
});

async function createPostController(req, res) {
  let imgUrl = "";

  try {
    if (req.file?.buffer) {
      const file = await imagekit.files.upload({
        file: await toFile(Buffer.from(req.file.buffer), "file"),
        fileName: "Test",
        folder: "cohort-2-insta-clone-posts",
      });
      imgUrl = file.url;
    }
  } catch (error) {
    console.error("Image upload failed", error);
  }

  try {
    const post = await postModel.create({
      caption: req.body?.caption || "",
      imgUrl,
      user: req.user.id,
    });

    return res.status(201).json({ message: "Post created successfully", post });
  } catch (error) {
    console.error("Post creation failed", error);
    return res
      .status(500)
      .json({ message: "Post creation failed", error: error.message });
  }
}

// GET /api/posts/ [protected] - Get all posts 1.31

async function getPostController(req, res) {
  const userId = req.user.id;
  const posts = await postModel.find({ user: userId });

  res.status(200).json({ message: "Posts fetched successfully", posts });
}

async function getPostDetailsController(req, res) {
  const userId = req.user.id;
  const postId = req.params.postId;

  const post = await postModel.findById(postId);

  if (!post) {
    return res.status(404).json({ message: "post not found" });
  }
  const isValidUser = post.user.toString() === userId;
  if (!isValidUser) {
    return res.status(403).json({ message: "forbidden content" });
  }
  return res.status(200).json({ message: "Post fetched successfully", post });
}

async function likePostController(req, res) {
  const username = req.user.username;
  const postId = req.params.postId;

  const post = await postModel.findById(postId);

  if (!post) {
    return res.status(404).json({
      message: "Post not found",
    });
  }

  const existingLike = await likeModel.findOne({
    post: postId,
    user: username,
  });

  if (existingLike) {
    await likeModel.findByIdAndDelete(existingLike._id);
    return res.status(200).json({
      message: "Post unliked successfully.",
      isLiked: false,
    });
  }

  const like = await likeModel.create({
    post: postId,
    user: username,
  });

  res.status(200).json({
    message: "Post liked successfully.",
    isLiked: true,
    like,
  });
}

async function getFeedController(req, res) {
  const user = req.user;
  const posts = await postModel.find().populate("user").lean();

  const postsWithLikeStatus = await Promise.all(
    posts.map(async (post) => {
      const isLiked = await likeModel.findOne({
        user: user.username,
        post: post._id,
      });

      post.isLiked = Boolean(isLiked);
      return post;
    }),
  );

  res.status(200).json({
    message: "posts fetched successfully.",
    posts: postsWithLikeStatus,
  });
}

async function deletePostController(req, res) {
  const userId = req.user.id;
  const postId = req.params.postId;

  try {
    const post = await postModel.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // Check if the user trying to delete the post is the owner
    if (post.user.toString() !== userId) {
      return res.status(403).json({ message: "You are not authorized to delete this post" });
    }

    await postModel.findByIdAndDelete(postId);
    
    // Optionally delete associated likes
    await likeModel.deleteMany({ post: postId });

    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    console.error("Failed to delete post", error);
    res.status(500).json({ message: "Failed to delete post", error: error.message });
  }
}

module.exports = {
  createPostController,
  getPostController,
  getPostDetailsController,
  likePostController,
  getFeedController,
  deletePostController,
};
