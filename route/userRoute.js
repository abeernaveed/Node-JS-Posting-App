const express = require("express");
const userController = require("./../controller/userController");
const userRouter = express.Router();

const upload = require("./../utils/multer");

userRouter.route("/create").post(userController.create);
userRouter.route("/logout").get(userController.logout);
userRouter.route("/login").post(userController.login);

userRouter
  .route("/profile")
  .get(userController.isLoggedIn, userController.profile);
userRouter
  .route("/upload")
  .get(userController.isLoggedIn, userController.upload);

userRouter
  .route("/upload")
  .post(
    userController.isLoggedIn,
    upload.single("file"),
    userController.uploadImage
  );

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
