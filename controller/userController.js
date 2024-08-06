const User = require("./../model/userModel");
const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");

const cookieParser = require("cookie-parser");
app.use(cookieParser());

exports.create = async (req, res, next) => {
  try {
    const newUser = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      passwordConfirm: req.body.passwordConfirm,
    });
    const token = await jwt.sign(
      { email: newUser.email, id: newUser._id },
      //   { id: newUser._id },

      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRES_IN,
      }
    );
    //
    // Find Post by User and store in it
    res.cookie("token", token);

    res.status(201).json({
      status: "success",
      token,
      data: {
        user: newUser,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};
exports.logout = async (req, res, next) => {
  res.cookie("token", "");
  res.redirect("/login");
};
exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  // 1) Check if email and password exists
  if (!email || !password) {
    return res.status(400).json({
      status: "fail",
      message: "Please provide email and password",
    });
  }
  const user = await User.findOne({ email }).select("+password");

  console.log(user);
  if (!user || !(await user.correctPassword(password, user.password))) {
    return res.status(401).json({
      status: "fail",
      message: "Incorrect email or password",
    });
  }
  const token = jwt.sign(
    { email: user.email, id: user._id },
    // { id: user._id },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_IN,
    }
  );
  res.cookie("token", token);
  // res.status(200).json({
  //   status: "success",
  //   token,
  // });
  res.redirect("/users/profile");
};

exports.isLoggedIn = (req, res, next) => {
  if (req.cookies.token === "") {
    return res.redirect("/login");
  } else {
    let data = jwt.verify(req.cookies.token, process.env.JWT_SECRET);
    req.user = data;
  }
  next();
};

exports.profile = async (req, res, next) => {
  let user = await User.findOne({ email: req.user.email }).populate("posts");
  await res.render("profile", { user });
};

exports.upload = (req, res) => {
  res.render("upload");
};
exports.uploadImage = async (req, res) => {
  console.log(req.file);
  const user = await User.findOne({ id: req.body.id });
  user.profile = req.file.filename;
  await user.save();
  res.redirect("/users/profile");
  console.log(user, req.file.filename);
};
