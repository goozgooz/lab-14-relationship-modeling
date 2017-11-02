'use strict';

const mongoose = require('mongoose');

const bookSchema = mongoose.Schema({
  title: {type: String, required: true, unique: true},
  author: {type: String},
  characters: [{type: mongoose.Schema.Types.ObjectId, ref: 'characters'}],
});

module.exports = mongoose.model('books', bookSchema);