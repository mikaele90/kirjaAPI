const mongoose = require('mongoose');

const {Schema} = mongoose;

const bookModel = new Schema(
    {
      title: {type: String, required: true},
      year: {type: Number, default: 2020},
      author: {type: String},
      genre: {type: String},
    },
);

module.exports = mongoose.model('Book', bookModel);
