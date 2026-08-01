const express = require("express");
const postRouter = express.Router();
const postController = require("../controllers/post.controller");
const identifyUser = require("../middlewares/auth.middleware");
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });

//POST/api/posts [protected] - create a post
// req.body = {caption, image-file}
// /api/posts
postRouter.post(
  "/",
  upload.single("chacha"),
  identifyUser,
  postController.createPostController,
);

//GET/api/posts [protected] - get all posts
postRouter.get("/", identifyUser, postController.getPostController);

//GET/api/posts/:id [protected] - get a post by id
//return a detail about a specific post with the id. also check whether the post belongs to the user that is requesting come from
postRouter.get(
  "/details/:postId",
  identifyUser,
  postController.getPostDetailsController,
);

//POST/api/posts/like/post:id

postRouter.post(
  "/like/:postId",
  identifyUser,
  postController.likePostController,
);

//GET/ api/posts/feed
//private
postRouter.get("/feed", identifyUser, postController.getFeedController);

//DELETE/api/posts/:postId [protected] - delete a post
postRouter.delete(
  "/:postId",
  identifyUser,
  postController.deletePostController
);

module.exports = postRouter;

