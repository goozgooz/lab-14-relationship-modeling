'use strict';

const mongoose = require('mongoose');
const Book = require('./book.js');

const characterSchema = mongoose.Schema({
  name: {type: String, required: true, unique: true},
  book: {type: mongoose.Schema.Types.ObjectId, ref:'books'},
});

// characterSchema.pre('save', function(done){
//   Book.findById(this.book)
//     .then(book => {
//       if(!book) return Promise.reject();
//       this.book = book._id;
//       return Promise.resolve();
//     })
//     .then((done))
//     .catch(done);
// });

module.exports = mongoose.model('characters', characterSchema);

