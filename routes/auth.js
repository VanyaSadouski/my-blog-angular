var mongoose = require("mongoose");
var passport = require("passport");
var config = require("../config/settings");
require("../config/passport")(passport);
var express = require("express");
var jwt = require("jsonwebtoken");
var router = express.Router();
var User = require("../models/User-model");

router.post("/register", (req, res) => {
  if (!req.body.username || !req.body.password || !req.body.email) {
    res.json({ success: false, msg: "Please pass username and password :(" });
  } else {
    var newUser = new User({
      password: req.body.password,
      username: req.body.username,
      email: req.body.email,
      role: "user"
    });
    newUser.save(err => {
      if (err) {
        return res.json({ success: false, msg: "Username or email exists:(" });
      }
      res.json({ success: true, msg: "Success create new guy :)" });
    });
  }
});

router.post("/login", function(req, res) {
  User.findOne(
    {
      username: req.body.username
    },
    function(err, user) {
      if (err) throw err;

      if (!user) {
        res.status(401).send({
          success: false,
          msg: "Authentication failed. User not found."
        });
      } else {
        user.comparePassword(req.body.password, function(err, isMatch) {
          if (isMatch && !err) {
            var token = jwt.sign(user.toJSON(), config.secret);
            // res.json({ success: true, token: "JWT " + token, user });
            res.json({
              success: true,
              token: "JWT " + token,
              user
            });
          } else {
            res.status(401).send({
              success: false,
              msg: "Authentication failed. Wrong password."
            });
          }
        });
      }
    }
  );
});

router.post(
  "/logout",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    req.logOut();
    res.json({ success: true });
  }
);

module.exports = router;
