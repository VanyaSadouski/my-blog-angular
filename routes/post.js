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
  "/:category",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    var token = getToken(req.headers);
    if (token) {
      Post.find({ category: req.params.category }, (err, posts) => {
        if (err) return next(err);
        res.json(posts);
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
