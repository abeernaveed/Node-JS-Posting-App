const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please write your name"],
  },
  email: {
    type: String,
    required: [true, "Please write your email"],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "Please provide a valid email."],
  },
  password: {
    type: String,
  },
  //   password: {
  //     type: String,
  //     required: [true, "Please write your password"],
  //     minlength: 8,
  //     select: false,
  //   },
  //   passwordConfirm: {
  //     type: String,
  //     required: [true, "Please confirm your password"],
  //     validate: {
  //       validator: function (el) {
  //         return el === this.password;
  //       },
  //       message: "Passwords are not the same!",
  //     },
  //   },
  posts: [
    // Array of IDs of Post
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "post",
    },
  ],
  profile: {
    type: String,
    default: "default.png",
  },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
  next();
});

userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

module.exports = mongoose.model("user", userSchema);
