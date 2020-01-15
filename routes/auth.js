var mongoose = require("mongoose");
var passport = require("passport");
var config = require("../config/settings");
require("../config/passport")(passport);
var express = require("express");
var jwt = require("jsonwebtoken");
var router = express.Router();
var User = require("../models/User-model");
var nodemailer = require("nodemailer");
var crypto = require("crypto");
var Token = require("../models/Token-model");

router.post("/register", (req, res) => {
  if (!req.body.username || !req.body.password || !req.body.email) {
    res.json({ success: false, msg: "Please pass username and password :(" });
  } else {
    User.findOne(
      { email: req.body.email, username: req.body.username },
      function(err, user) {
        if (user) {
          return res.json({
            success: false,
            msg: "Username or email exists:("
          });
        }

        var newUser = new User({
          password: req.body.password,
          username: req.body.username,
          email: req.body.email,
          role: "user"
        });
        newUser.save(err => {
          if (err) {
            return res.json({
              success: false,
              msg: "Username or email exists:("
            });
          }
          var token = new Token({
            _userId: newUser._id,
            token: crypto.randomBytes(16).toString("hex")
          });

          token.save(function(err) {
            if (err) {
              return res.status(500).send({ msg: err.message });
            }
            var transporter = nodemailer.createTransport({
              service: "gmail",
              auth: {
                user: "myblogng2019@gmail.com",
                pass: "testmail2019"
              }
            });

            var hostName;

            if (process.env.NODE_ENV !== "production") {
              hostName = "localhost:4200";
            } else {
              hostName = "my-blog-client-angular.herokuapp.com";
            }
            var mailOptions = {
              from: "myblogng2019@gmail.com",
              to: newUser.email,
              subject: "Account Verification Token for MyBlog",
              text:
                "Hello,\n\n" +
                "Please verify your account by clicking the link: \nhttp://" +
                hostName +
                "/auth/confirmation/" +
                token.token +
                ".\n"
            };

            transporter.sendMail(mailOptions, function(err) {
              if (err) {
                return res.status(500).send({ msg: err.message });
              }
              return res.json({
                success: true,
                msg:
                  "A verification email has been sent to " + newUser.email + "."
              });
            });
          });
        });
      }
    );
  }
});

router.post("/confirmation", function(req, res) {
  Token.findOne(
    {
      token: req.body.token
    },

    function(err, token) {
      if (!token) {
        return res.status(400).send({
          msg:
            "We were unable to find a valid token. Your token my have expired."
        });
      }

      User.findOne({ _id: token._userId }, function(err, user) {
        if (!user) {
          return res
            .status(400)
            .send({ msg: "We were unable to find a user for this token." });
        } else {
          if (user.isVerified) {
            return res.status(400).send({
              msg: "This user has already been verified."
            });
          }
          user.isVerified = true;
          user.save(function(err) {
            if (err) {
              return res.status(500).send({ msg: err.message });
            }
            res.json("The account has been verified. Please log in.");
          });
        }
      });
    }
  );
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
          if (!isMatch || err) {
            res.status(401).send({
              success: false,
              msg: "Authentication failed. Wrong password."
            });
          }

          if (!user.isVerified) {
            return res.status(401).send({
              type: "not-verified",
              msg: "Your account has not been verified."
            });
          }
          var token = jwt.sign(user.toJSON(), config.secret);
          res.json({
            success: true,
            token: "JWT " + token,
            user
          });
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
