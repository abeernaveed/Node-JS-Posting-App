const Post = require("./../model/postModel");
const User = require("./../model/userModel");
exports.getAllPosts = async (req, res, next) => {
  res.send("Hello get ALl Posts");
};
exports.getPost = async (req, res, next) => {
  res.send("Hello get  Post");
};
exports.deletePost = async (req, res, next) => {
  res.send("Hello Delete post");
};
exports.updatePost = async (req, res, next) => {
  res.send("Hello Update Post");
};
exports.createPost = async (req, res) => {
  const newPost = await Post.create({
    id: req.body.id,
    postData: req.body.postData,
    user: req.body.user,
    content: req.body.content,
  });

  let user = await User.findOne({ _id: newPost.user });
  user.posts.push(newPost.id);
  await user.save();
  res.redirect("/users/profile");
};

// Like Post
exports.likePost = async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (post.likes.indexOf(req.user.id) === -1) {
    post.likes.push(req.user.id);
  } else {
    post.likes.pull(req.user.id);
  }
  await post.save();
  // console.log(req.user);
  res.redirect("/users/profile");
};

exports.editPost = async (req, res) => {
  const post = await Post.findById(req.params.id);
  res.render("edit", { post });
};

exports.updatePost = async (req, res) => {
  // DO not use findOneByIdAndUpdate, use instead below method
  const post = await Post.findById(req.params.id);
  console.log(post._id);
  post.postData = req.body.postData;
  post.content = req.body.content;
  await post.save();
  res.redirect("/users/profile");
};
