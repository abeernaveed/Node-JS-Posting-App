const express = require("express");
const app = express();

const userRouter = require("./route/userRoute");
const postRouter = require("./route/postRoute");

const path = require("path");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
dotenv.config({ path: "./.env" });

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(cookieParser());

// Connect Database

const DB = process.env.DATABASE.replace("<password>", process.env.PASSWORD);

// User Part
mongoose.connect(DB, {}).then(() => console.log("Mongo DB connected!😎!"));

app.use("/users", userRouter);
//Post part
app.use("/posts", postRouter);

// Views
app.get("/", function (req, res) {
  res.render("index");
});
app.get("/login", function (req, res) {
  res.render("login");
});

app.listen(process.env.PORT);
