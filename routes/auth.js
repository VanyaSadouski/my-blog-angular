var mongoose = require("mongoose");
var passport = require("passport");
var config = require("../config/settings");
require("../config/passport")(passport);
var express = require("express");
var jwt = require("jsonwebtoken");
var router = express.Router();
var User = require("../models/User-model");

router.post("/register", (req, res) => {
  if (!req.body.username || !req.body.password) {
    res.json({ success: false, msg: "Please pass username and password :(" });
  } else {
    var newUser = new User({
      password: req.body.password,
      username: req.body.username
    });
    newUser.save(err => {
      if (err) {
        return res.json({ success: false, msg: "Username exists :(" });
      }
      res.json({ success: true, msg: "Success create new guy :)" });
    });
  }
});

router.post("/login", (req, res) => {
  User.findOne(
    {
      username: req.body.username
    },
    (err, user) => {
      if (err) {
        throw err;
      }
      if (!user) {
        res.status(401).send({ success: false, msg: "User not found :(" });
      } else {
        user.comparePassword(req.body.password, (err, isMatch) => {
          if (!err && isMatch) {
            var token = jwt.sign(user.toJSON(), config.secret);
            res.json({ success: true, token: "JWT" + token });
          } else {
            res.status(401).send({ success: false, msg: "Wrong password :(" });
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
