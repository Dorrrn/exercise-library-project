const router = require("express").Router();
const Book = require("../models/Book.model");

//==== Create route to /books

router.get("/", (req, res, next) => {
  Book.find()
    .then((booksFromDB) => {
      res.render("books/books-list", { books: booksFromDB });
    })
    .catch();
});

//===== Create route for /books/create
// !! must be above :bookId, otherwise it will match it
router.get("/create", (req, res, next) => {
  res.render("books/book-create");
});

// ===== Create route for submit page
router.post("/create", (req, res, next) => {
  
  const {title, author, description, rating} = req.body
  const bookDetails = req.body

  // const bookDetails = {
  //   title: req.body.title,
  //   author: req.body.author,
  //   description: req.body.description,
  //   rating: req.body.rating
  // }

  Book.create(bookDetails)
  .then((book) => {
    res.redirect("/books")
  })
  .catch((err) => {
    console.log('sorry', err)
  })
})

//==== Create route to book details
router.get("/:bookId", (req, res, next) => {
  Book.findById(req.params.bookId)
    .then((bookDetails) => {
      //console.log(bookDetails)
      res.render("books/book-details", bookDetails);
    })
    .catch();
});


//======
module.exports = router;
