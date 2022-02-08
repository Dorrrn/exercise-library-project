const router = require("express").Router();
const Book = require("../models/Book.model");
const Author = require("../models/Author.model");

//==== Create route to /books

router.get("/", (req, res, next) => {
  Book.find()
    .populate("author")
    .then((booksFromDB) => {
      res.render("books/books-list", { books: booksFromDB });
    })
    .catch();
});

//===== Create GET-route for /books/create
// !! must be above :bookId, otherwise it will match it
router.get("/create", (req, res, next) => {
  res.render("books/book-create");
});

// ===== Create POST-route for books/create submit page
router.post("/create", (req, res, next) => {
  const { title, author, description, rating } = req.body;
  const bookDetails = req.body;

  // --> same as:
  // const bookDetails = {
  //   title: req.body.title,
  //   author: req.body.author,
  //   description: req.body.description,
  //   rating: req.body.rating
  // }

  Book.create(bookDetails)
    .then((book) => {
      res.redirect("/books");
    })
    .catch((err) => {
      console.log("sorry", err);
    });
});

//==== Create route to book details
router.get("/:bookId", (req, res, next) => {
  const bookId = req.params.bookId;

  Book.findById(bookId)
    .populate("author")
    .then((bookDetails) => {
      //console.log(bookDetails)
      res.render("books/book-details", bookDetails);
    })
    .catch();
});

//=== Create route for update book page
router.get("/:bookId/edit", (req, res, next) => {
  const bookId = req.params.bookId;

  Book.findById(bookId)
    .then((bookDetails) => {
      res.render("books/book-edit", bookDetails);
    })
    .catch((err) => {
      console.log("Error getting book details from DB...", err);
    });
});

// ===== Create route for book edit page
router.post("/:bookId/edit", (req, res, next) => {
  const bookId = req.params.bookId;
  const { title, author, description, rating } = req.body;
  const newDetails = req.body;

  // same as:
  // const newDetails = {
  //   title: req.body.title,
  //   author: req.body.author,
  //   description: req.body.description,
  //   rating: req.body.rating
  // };

  Book.findByIdAndUpdate(bookId, newDetails)
    .then(() => {
      res.redirect(`/books/${bookId}`);
    })
    .catch((err) => {
      console.log("Error updating book details", err);
    });
});

//====== Create route for book delete page
router.post("/:bookId/delete", (req, res, next) => {
  const bookId = req.params.bookId;

  Book.findByIdAndDelete(bookId)
    .then(() => {
      res.redirect("/books");
    })
    .catch((err) => {
      console.log("Error deleting book", err);
    });
});

module.exports = router;
