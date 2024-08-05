const express = require("express");
const userController = require("./../controller/userController");
const userRouter = express.Router();

userRouter.route("/create").post(userController.create);
userRouter.route("/logout").get(userController.logout);
userRouter.route("/login").post(userController.login);

userRouter
  .route("/profile")
  .get(userController.isLoggedIn, userController.profile);

// userRouter
//   .route("/")
//   .get(userController.getAllUsers)
//   .post(userController.createUser);
// userRouter
//   .route("/:id")
//   .get(userController.getUser)
//   .delete(userController.deleteUser)
//   .patch(userController.updateUser);
module.exports = userRouter;
