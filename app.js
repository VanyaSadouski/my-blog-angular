var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
var passport = require("passport");
var auth = require("./routes/auth");
var category = require("./routes/category");
var post = require("./routes/post");
var cors = require("cors");
require("dotenv").config({ path: "my-blog-server/.env" });
var app = express();

app.use(cors());
mongoose
  .connect(process.env.mongoCreds, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  })
  .then(() => console.log("cool"))
  .catch(error => console.log(error));

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");

app.use(passport.initialize());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/api/auth", auth);
app.use("/api/category", category);
app.use("/api/post", post);

app.use("/", indexRouter);
app.use("/users", usersRouter);

module.exports = app;
