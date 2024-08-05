const express = require("express");
const postController = require("./../controller/postController");
const userController = require("./../controller/userController");

const postRouter = express.Router();

const {
  getAllPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
} = require("./../controller/postController");

postRouter.route("/").get(getAllPosts);
postRouter.route("/:id").get(getPost).patch(updatePost).delete(deletePost);
postRouter
  .route("/")
  .post(userController.isLoggedIn, postController.createPost);
postRouter
  .route("/like/:id")
  .get(userController.isLoggedIn, postController.likePost);
postRouter
  .route("/edit/:id")
  .get(userController.isLoggedIn, postController.editPost);

module.exports = postRouter;
