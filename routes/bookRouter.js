/* eslint-disable require-jsdoc, new-cap, max-len */
const express = require('express');
const booksController = require('../controllers/booksController');

function routes(Book) {
  const bookRouter = express.Router();
  const bController = booksController(Book);
  bookRouter.route('/test')
      .get(async (req, res) => {
        const response = {'It\'s working': 'Just a test'};
        return await res.json(response);
      });
  bookRouter.route('/books')
      .post(bController.post)
      .get(bController.get);
  bookRouter.use('/books/:bookId', async (req, res, next) => {
    await Book.findById(req.params.bookId, (err, book) => {
      if (err) {
        return res.send(err);
      } if (book) {
        req.book = book;
        return next();
      }
      return res.sendStatus(404);
    });
  });
  bookRouter.route('/books/:bookId')
      .get(async (req, res) => {
        const aBook = await req.book.toJSON();
        const bookGenre = await req.book.genre.split(' ').join('%20').split('&').join('%26');
        const bookAuthor = await req.book.author.split(' ').join('%20').split('&').join('%26');
        const bookYear = await req.book.year;
        aBook.links = {};
        aBook.links.linkToGenre = `http://${req.headers.host}/api/v1/books/?genre=${bookGenre}`;
        aBook.links.linkToAuthor = `http://${req.headers.host}/api/v1/books/?author=${bookAuthor}`;
        aBook.links.linkToYear = `http://${req.headers.host}/api/v1/books/?year=${bookYear}`;
        aBook.links.linkToAllBooks = `http://${req.headers.host}/api/v1/books/`;
        res.json(aBook);
      })
      .put(async (req, res) => {
        const {book} = await req;
        console.log(book);
        book.title = req.body.title;
        book.year = req.body.year;
        book.author = req.body.author;
        book.genre = req.body.genre;
        if (!req.body.title) {
          res.status(400);
          return res.send('Title required');
        }
        req.book.save((err) => {
          if (err) {
            res.send(err);
          }
          return res.json(book);
        });
      })
      .patch(async (req, res) => {
        const {book} = await req;

        if (req.body._id) {
          delete req.body._id;
        }
        Object.entries(req.body).forEach((item) => {
          const key = item[0];
          const value = item[1];
          book[key] = value;
        });
        if (!req.body.title) {
          res.status(400);
          return res.send('Title required');
        }
        req.book.save((err) => {
          if (err) {
            res.send(err);
          }
          return res.json(book);
        });
      })
      .delete(async (req, res) => {
        await req.book.remove((err) => {
          if (err) {
            return res.send(err);
          }
          return res.sendStatus(204);
        });
      });
  return bookRouter;
}

module.exports = routes;
