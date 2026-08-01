const express = require("express");
const userController = require("../controllers/user.controller");
const indentifyUser = require("../middlewares/auth.middleware");
const identifyUser = require("../middlewares/auth.middleware");

const userRouter = express.Router();

// @route //POST/ api/users/follow/:userid
// @description follow a user
// @access private
userRouter.post(
  "/follow/:username",
  identifyUser,
  userController.followUserController,
);

//POST /api/users/unfollow/:userid
// @description Unfollow a user
// @access Private

userRouter.post(
  "/unfollow/:username",
  identifyUser,
  userController.unfollowUserController,
); //51.41



module.exports = userRouter;
