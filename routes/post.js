var passport = require("passport");
var config = require("../config/settings");
require("../config/passport")(passport);
var express = require("express");
var jwt = require("jsonwebtoken");
var router = express.Router();
var Post = require("../models/Post-model");

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    var token = getToken(req.headers);
    if (token) {
      Post.find((err, posts) => {
        if (err) return next(err);
        res.json(posts);
      });
    } else {
      return res.status(403).send({ success: false, msg: "Unauthorized." });
    }
  }
);

router.get(
  "/most-liked-list/:postLang",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    var token = getToken(req.headers);
    if (token) {
      Post.find({ postLang: req.params.postLang }, (err, posts) => {
        if (err) {
          return next(err);
        }
        if (posts) {
          let sortedPosts = posts.sort((a, b) =>
            a.likedByUsers.length < b.likedByUsers.length ? 1 : -1
          );

          sortedPosts = sortedPosts.slice(0, 3);

          res.json(sortedPosts);
        }
      });
    } else {
      return res.status(403).send({ success: false, msg: "Unauthorized :(" });
    }
  }
);

router.get(
  "/:category",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    var token = getToken(req.headers);
    if (token) {
      Post.find({ category: req.params.category }, (err, posts) => {
        if (posts) {
          res.json(posts);
        } else {
          res.json([]);
        }
      });
    } else {
      return res.status(403).send({ success: false, msg: "Unauthorized." });
    }
  }
);

router.get(
  "/post/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res, next) => {
    var token = getToken(req.headers);
    if (token) {
      Post.findById(req.params.id, (err, post) => {
        if (err) return next(err);
        res.json(post);
      });
    } else {
      return res.status(403).send({ success: false, msg: "Unauthorized." });
    }
  }
);

router.get(
  "/isLiked/:user/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res, next) => {
    var token = getToken(req.headers);
    if (token) {
      Post.findById(req.params.id, (err, post) => {
        if (err) return next(err);
        if (post && post.likedByUsers.includes(req.params.user)) {
          res.json(true);
        } else {
          res.json(false);
        }
      });
    } else {
      return res.status(403).send({ success: false, msg: "Unauthorized." });
    }
  }
);

router.get(
  "/dislike/:user/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res, next) => {
    var token = getToken(req.headers);
    if (token) {
      Post.findById(req.params.id, (err, post) => {
        if (err) return next(err);
        if (post) {
          var newPost = post;
          var index = newPost.likedByUsers.indexOf(req.params.user);
          if (index !== -1) {
            newPost.likedByUsers.splice(index, 1);
          }
          Post.findByIdAndUpdate(req.params.id, newPost, (err, post) => {
            if (err) return next(err);
            res.json(post);
          });
        }
      });
    } else {
      return res.status(403).send({ success: false, msg: "Unauthorized." });
    }
  }
);

router.get(
  "/like/:user/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res, next) => {
    var token = getToken(req.headers);
    if (token) {
      Post.findById(req.params.id, (err, post) => {
        if (err) return next(err);
        if (post) {
          var newPost = post;
          newPost.likedByUsers.push(req.params.user);
          Post.findByIdAndUpdate(req.params.id, newPost, (err, post) => {
            if (err) return next(err);
            res.json(post);
          });
        }
      });
    } else {
      return res.status(403).send({ success: false, msg: "Unauthorized." });
    }
  }
);

router.post(
  "/comment/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res, next) => {
    var token = getToken(req.headers);
    if (token) {
      Post.findById(req.params.id, (err, post) => {
        if (err) return next(err);
        if (post) {
          var newPost = post;
          newPost.comments.push(req.body);
          Post.findByIdAndUpdate(req.params.id, newPost, (err, post) => {
            if (err) return next(err);
            res.json(post);
          });
        }
      });
    } else {
      return res.status(403).send({ success: false, msg: "Unauthorized." });
    }
  }
);

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res, next) => {
    var token = getToken(req.headers);
    if (token) {
      Post.create(req.body, (err, post) => {
        if (err) return next(err);
        res.json(post);
      });
    } else {
      return res.status(403).send({ success: false, msg: "Unauthorized." });
    }
  }
);

router.put(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res, next) => {
    var token = getToken(req.headers);
    if (token) {
      Post.findByIdAndUpdate(req.params.id, req.body, (err, post) => {
        if (err) return next(err);
        res.json(post);
      });
    } else {
      return res.status(403).send({ success: false, msg: "Unauthorized." });
    }
  }
);

router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res, next) => {
    var token = getToken(req.headers);
    if (token) {
      Post.findByIdAndRemove(req.params.id, req.body, (err, post) => {
        if (err) return next(err);
        res.json(post);
      });
    } else {
      return res.status(403).send({ success: false, msg: "Unauthorized." });
    }
  }
);

getToken = headers => {
  if (headers && headers.authorization) {
    var parted = headers.authorization.split(" ");
    if (parted.length === 2) {
      return parted[1];
    } else {
      return null;
    }
  } else {
    return null;
  }
};

module.exports = router;
