// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require("dotenv/config");

// ℹ️ Connects to the database
require("./db");

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require("express");

// Handles the handlebars
// https://www.npmjs.com/package/hbs
const hbs = require("hbs");

const app = express();

// session config
require("./config/session.config")(app);

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require("./config")(app);

// require auth middleware
const { isLoggedIn, isLoggedOut } = require('./middleware/middleware.js');

// default value for title local
const projectName = "library-project";
const capitalized = (string) =>
  string[0].toUpperCase() + string.slice(1).toLowerCase();

app.locals.title = `${capitalized(projectName)} created with IronLauncher`;

// Local variable to use eg. in layout.hbs
app.use( (req, res, next) => {
  //res.locals.session = req.session; 
  // --> layout.hbs --> {{#if session.currentUser}}
  res.locals.userInSession = req.session.currentUser; 
  // -->layout.hbs --> {{#if userInSession}}
  next();
});

// 👇 Start handling routes here
app.use("/", require("./routes/index"));
app.use("/", require("./routes/auth"));
app.use("/books", isLoggedIn, require("./routes/books"));
app.use("/authors", isLoggedIn, require("./routes/authors"));


// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);

module.exports = app;
