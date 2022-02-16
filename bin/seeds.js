// bin/seeds.js

require("dotenv").config();
const mongoose = require("mongoose");

const Book = require("../models/Book.model");
const Author = require("../models/Author.model");

const MONGO_URI =
  process.env.MONGODB_URI || "mongodb://localhost/library-project";

console.log(MONGO_URI);

mongoose
  .connect(MONGO_URI)
  .then((x) => {
    console.log(
      `Connected to Mongo! Database name: "${x.connections[0].name}"`
    );
  })
  .catch((err) => {
    console.error("Error connecting to mongo: ", err);
  });

// PASTE HERE THE LIST OF BOOKS PROVIDED IN THIS GIST: https://gist.github.com/ironhack-edu/2816267a015d4870f95275cb873d33b6

// === !!  Warining: in case you want to drop collection ====
//Book.collection.drop();
//Author.collection.drop();

// const books = [
//   {
//     title: "The Hunger Games",
//     description:
//       "The Hunger Games is a 2008 dystopian novel by the American writer Suzanne Collins. It is written in the voice of 16-year-old Katniss Everdeen, who lives in the future, post-apocalyptic nation of Panem in North America. The Capitol, a highly advanced metropolis, exercises political control over the rest of the nation. The Hunger Games is an annual event in which one boy and one girl aged 12–18 from each of the twelve districts surrounding the Capitol are selected by lottery to compete in a televised battle royale to the death.",
//     rating: 10,
//   },
//   {
//     title: "Harry Potter 1: and the philosopher's stone",
//     description:
//       "Harry Potter is a series of seven fantasy novels written by British author, J. K. Rowling. The novels chronicle the lives of a young wizard, Harry Potter, and his friends Hermione Granger and Ron Weasley, all of whom are students at Hogwarts School of Witchcraft and Wizardry. The main story arc concerns Harry's struggle against Lord Voldemort, a dark wizard who intends to become immortal, overthrow the wizard governing body known as the Ministry of Magic and subjugate all wizards and Muggles (non-magical people).",

//     rating: 9,
//   },
//   {
//     title: "Harry Potter 2: and the chamber of secrets",
//     description:
//       "Harry Potter is a series of seven fantasy novels written by British author, J. K. Rowling. The novels chronicle the lives of a young wizard, Harry Potter, and his friends Hermione Granger and Ron Weasley, all of whom are students at Hogwarts School of Witchcraft and Wizardry. The main story arc concerns Harry's struggle against Lord Voldemort, a dark wizard who intends to become immortal, overthrow the wizard governing body known as the Ministry of Magic and subjugate all wizards and Muggles (non-magical people).",

//     rating: 9,
//   },
// ];

// const authors = [
//   {
//     name: "Suzanne Collins",
//     age: 40,
//     country: "USA",
//   },
//   {
//     name: "J.K. Rowling ",
//     age: 50,
//     country: "UK",
//   },
// ];

// Creating Promise.all()
// const booksPromise = Book.create(books);
// const authorsPromise = Author.create(authors);

// Promise.all([booksPromise, authorsPromise])
//   .then((result) => {
//     console.log(`Created ${result[0].length} books`);
//     console.log(`Created ${result[1].length} authors`);
//     mongoose.connection.close();
//   })
//   .catch((err) => {
//     console.log("error seeding data in DB...", err);
//   });

// Book.create(books)
//   .then((booksFromDB) => {
//     console.log(`Created ${booksFromDB.length} books`);
//   })
//   .catch((err) =>
//     console.log(`An error occurred while creating books from the DB: ${err}`)
//   );

// Author.create(authors)
//   .then((authorsFromDB) => {
//     console.log(`Created ${authorsFromDB.length} books`);

//     // Once created, close the DB connection
//     mongoose.connection.close();
//   })
//   .catch((err) =>
//     console.log(`An error occurred while creating authors from the DB: ${err}`)
//   );
