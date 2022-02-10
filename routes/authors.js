const router = require("express").Router();
const Author = require("../models/Author.model");
const Book = require("../models/Book.model");

//==== Create route to /authors

router.get("/", (req, res, next) => {
  let books;

  Book.find()
    .then((booksFromDB) => {
      books = booksFromDB;
      return Author.find();
    })
    .then((authorsFromDB) => {
      const authorsArr = authorsFromDB.map((authorDetails) => {
        const { _id, name, age, country } = authorDetails;

        const booksFromAuthor = books.filter((book) => {
          return book.author.toString() == _id.toString();
        });

        const numberOfBooks = booksFromAuthor.length; // Length of array
        return { name, age, country, numberOfBooks };
      });

      res.render("authors/authors-list", { authors: authorsArr});
    })
    .catch((err) => {
      console.log("Error getting authors from DB...", err);
    });
});

module.exports = router;
