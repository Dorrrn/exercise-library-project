const router = require("express").Router();
const Author = require("../models/Author.model");

//==== Create route to /authors

router.get("/", (req, res, next) => {
  Author.find()
    .then((authorsFromDB) => {
      res.render("authors/authors-list", { authors: authorsFromDB });
    })
    .catch((err) => {
      console.log("Error getting authors from DB...", err);
    });
});

module.exports = router;
