const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const { check, validationResult } = require("express-validator");

// Model
const User = require("../../models/User");

// @route  POST api/users
// @desc   Register user
// @access Public
router.post(
    "/",
    [
      check("first_name", "Firstname is required")
        .not()
        .isEmpty(),
      check("last_name", "Lastname is required")
        .not()
        .isEmpty(),
      check("email", "Please include a valid email").isEmail(),
      check(
        "password",
        "Please enter a password with 6 or more character"
      ).isLength({
        min: 6
      })
    ],
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.json({
          data: {
            status: "warning",
            msg: "Some Field are Required"
          }
        });
      }
  
      const {
        first_name,
        last_name,
        email,
        role,
        password
      } = req.body;
  
      try {
        // check if the user exist
        let user = await User.findOne({ email });
  
        if (user) {
          return res.json({
            data: {
              status: "warning",
              msg: "User already exist"
            }
          });
        }
  
        user = new User({
          first_name,
          last_name,
          email,
          role,
          password
        });
  
        // encrypt
        const salt = await bcrypt.genSalt(10);
  
        user.password = await bcrypt.hash(password, salt);
  
        await user.save();
  
        // return jsonwebtoken
        const payload = {
          user: {
            id: user.id
          }
        };
  
        jwt.sign(
          payload,
          config.get("jwtToken"),
          { expiresIn: 36000 },
          (err, token) => {
            if ((err, token)) {
              return res.json({
                data: {
                  status: "success",
                  msg: "User has been successfully created"
                },
                user,
                token
              });
            }
          }
        );
      } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
      }
    }
  );
  // update user
  router.put("/update/:user_id", async (req, res) => {
    const {
      first_name,
      last_name,
      role,
    } = req.body;
    try {
      // update user
      const user = await User.findById(req.params.user_id);
      user.first_name = first_name;
      user.last_name = last_name;
      user.role = role;
      await user.save();
      res.json({
        data: {
          status: "success",
          msg: "Profile Updated"
        }
      });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  });
  
  // dlete user
  router.delete("/delete/:user_id", async (req, res) => {
    try {
      await User.deleteOne({ _id: req.params.user_id });
      res.json({
        data: {
          status: "success",
          msg: "User Removed!"
        }
      });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  });
  
  // get all user
  router.get("/", async (req, res) => {
    try {
      const user = await User.find();
  
      res.json(user);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }); 

// get single user
router.get("/:user_id", async (req,res) => {
    try {
        const user = await User.findById(req.params.user_id);
        res.json(user);
        res.json({
            data: {
              status: "success",
              msg: "Profile Updated"
            }
          });
    } catch (err) {
        console.log(err.message);
        res.status(500).send("Server error")
    }
})

  module.exports = router;