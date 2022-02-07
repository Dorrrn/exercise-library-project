const router = require("express").Router();
const Book = require("../models/Book.model");

router.get("/", (req, res, next) => {
  Book.find()
    .then((booksFromDB) => {
      res.render("books/books-list", { books: booksFromDB });
    })
    .catch();
});

router.get("/:bookId", (req, res, next) => {
  Book.findById(req.params.bookId)
    .then((bookDetails) => {
      //console.log(bookDetails)
      res.render("books/book-details", bookDetails);
    })
    .catch();
});

module.exports = router;
