const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

// Check if ENV is 'TestENV', as defined in ./tests/booksIntegrationTest.js
if (process.env.ENV === 'TestENV') {
  console.log('Running in TestENV...');
  // eslint-disable-next-line no-unused-vars
  const db = mongoose.connect('mongodb://localhost/bookAPI-test');
} else {
  console.log('Running in DevENV');
  // eslint-disable-next-line no-unused-vars
  const db = mongoose.connect('mongodb://localhost/bookAPI-dev');
}
// port from package.json or 3000 (if missing config)
const port = process.env.PORT || 3000;

const Book = require('../models/bookModel');
const bookRouter = require('../routes/bookRouter')(Book);

app.use(bodyParser.urlencoded( {extended: true} ));
app.use(bodyParser.json());

// API Router
app.use('/api/v1', bookRouter);

/* Frontend stuff */
// setup app to use handlebars.js for templating
app.set('view engine', 'hbs');
app.set('./../views/', path.join(__dirname, './../views/'));

// serve static files in /views-folder and its sub-folders
app.use(express.static('views'));

/** get hbs
 * (could be changed to static html files if needed,
 * but kept solely for the learning experience) */
app.get('/', async (req, res) => {
  await res.render('index');
});
app.get('/list', async (req, res) => {
  await res.render('list');
});
/* Frontend stuff end */

// npm start
app.server = app.listen(port, () => {
  console.log('Listening to port: ' + port);
});

// Export module (for use in integration test)
module.exports = app;
