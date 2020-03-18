/* eslint-disable require-jsdoc, max-len */
function booksController(Book) {
  async function post(req, res) {
    const book = await new Book(req.body);
    if (!req.body.title) {
      res.status(400);
      return res.send('Title required');
    }
    console.log(book);
    book.save();
    res.status(201);
    return res.json(book);
  }
  async function get(req, res) {
    const query = {};
    if (await req.query.genre) {
      query.genre = req.query.genre;
    }
    if (await req.query.author) {
      query.author = req.query.author;
    }
    if (await req.query.year) {
      query.year = req.query.year;
    }
    await Book.find(query, (err, books) => {
      if (err) {
        return res.send(err);
      }
      const bookMap = books.map((book) => {
        const aBook = book.toJSON();
        const bookGenre = book.genre.split(' ').join('%20').split('&').join('%26');
        const bookAuthor = book.author.split(' ').join('%20').split('&').join('%26');
        const bookYear = book.year;
        aBook.links = {};
        aBook.links.linkToThisBook = `http://${req.headers.host}/api/v1/books/${book._id}`;
        aBook.links.linkToGenre = `http://${req.headers.host}/api/v1/books/?genre=${bookGenre}`;
        aBook.links.linkToAuthor = `http://${req.headers.host}/api/v1/books/?author=${bookAuthor}`;
        aBook.links.linkToYear = `http://${req.headers.host}/api/v1/books/?year=${bookYear}`;
        aBook.links.linkToAllBooks = `http://${req.headers.host}/api/v1/books/`;
        return aBook;
      });
      return res.json(bookMap);
    });
  }
  return {post, get};
}

module.exports = booksController;
