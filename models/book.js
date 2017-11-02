'use strict';

const mongoose = require('mongoose');
const Character = require('./character.js');

const bookSchema = mongoose.Schema({
  title: {type: String, required: true, unique: true},
  author: {type: String},
  characters: [{type: mongoose.Schema.Types.ObjectId, ref: 'characters'}],
});


bookSchema.pre('findOne', function(done){
  this.populate('characters');
  done();
});

module.exports = mongoose.model('books', bookSchema);