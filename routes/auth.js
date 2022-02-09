const router = require("express").Router();
const mongoose = require("mongoose");
const bcryptjs = require("bcryptjs");
const User = require("../models/User.model");
const saltRounds = 10;

///// ===== Sign up page ====== /////

// Create GET-route for /signup
router.get("/signup", (req, res, next) => {
  res.render("auth/signup");
});

// Create POST-route for /signup to process form data
router.post("/signup", (req, res, next) => {
  const { email, password } = req.body;

  // check if email and pw are provided
  if (!email || !password) {
    res.render("auth/signup", {
      errorMessage: "Please provide both, email and password",
    });
    return;
  }

  // make sure passwords are strong:
  const regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
  if (!regex.test(password)) {
    res.status(500).render("auth/signup", {
      errorMessage:
        "Password needs to have at least 6 chars and must contain at least one number, one lowercase and one uppercase letter.",
    });
    return;
  }

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

    .catch((error) => {
      if (error instanceof mongoose.Error.ValidationError) {
        res.status(500).render("auth/signup", { errorMessage: error.message });
      } else {
        next(error);
      }
    });
});

///// ===== Login page ====== /////

// Create GET-route for /login
router.get("/login", (req, res, next) => {
  res.render("auth/login");
});

// Create POST-route for /login to process form data
router.post("/login", (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.render("auth/login", {
      errorMessage: "Please enter both, email and password to login.",
    });
    return;
  }

  User.findOne({ email: email })
    .then((userFromDB) => {
      if (!userFromDB) {
        res.render("auth/login", {
          errorMessage: "Email is not registered. Try with other email.",
        });
        return;
      } else if (bcryptjs.compareSync(password, userFromDB.passwordHash)) {
        req.session.currentUser = userFromDB; 
        res.redirect("/user-profile");
      } else {
        res.render("auth/login", {
          errorMessage: "Incorrect credentials",
        });
      }
    })

    .catch((error) => next(error));
});

// Create route for /user-profile
router.get("/user-profile", (req, res) => {
  res.render("users/user-profile", {userInSession: req.session.currentUser});
});

module.exports = router;
