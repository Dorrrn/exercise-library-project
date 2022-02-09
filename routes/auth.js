const router = require("express").Router();
const bcryptjs = require("bcryptjs");
const User = require("../models/User.model");
const saltRounds = 10;

// Create GET-route for /signup
router.get("/signup", (req, res, next) => {
  res.render("auth/signup");
});

// Create POST-route for /signup
router.post("/signup", (req, res, next) => {
  const { email, password } = req.body;

  bcryptjs
    .genSalt(saltRounds)
    .then((salt) => {
      return bcryptjs.hash(password, salt);
    })
    .then((hash) => {
      const userDetails = {
        email, // same as --> email: email
        passwordHash: hash,
      };
      return User.create(userDetails);
    })
    .then((userFromDB) => {
      res.send("user created...");
    })
    .catch((err) => {
      console.log("Error generating hash", err);
    });
});

module.exports = router;
