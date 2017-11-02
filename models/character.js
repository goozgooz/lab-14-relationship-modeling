'use strict';

const mongoose = require('mongoose');

const characterSchema = mongoose.Schema({
  name: {type: String, required: true, unique: true},
  book: {type: mongoose.Schema.Types.ObjectId, ref:'books'},
});

module.exports = mongoose.model('characters', characterSchema);