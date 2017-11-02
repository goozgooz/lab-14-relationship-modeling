'use strict';

const express = require('express');
const jsonParser = require('body-parser').json();
const Book = require('../models/book.js');

const bookRouter = module.exports = express.Router();

// post a book
bookRouter.post('/books', jsonParser, (req, res, next) => {
  if(!req.body.title) return res.status(400).send('no book title given');
  let newBook = new Book(req.body);
  newBook.save()
    .then(res.send.bind(res))
    .catch(next);
});

// get all books
bookRouter.get('/books', (req, res, next) => {
  Book.find({})
    .then(res.send.bind(res))
    .catch(next);
});

// get one book
bookRouter.get('/books/:id', (req, res, next) => {
  Book.findOne({_id: req.params.id})
    .then(book => {
      if(book === null) res.status(404).send('that book id does not exsist');
      res.status(200).send(book);
    })
    .catch(next);
});

// delete one book
bookRouter.delete('/books/:id', (req, res, next) => {
  Book.remove({_id: req.params.id})
    .then(res.status(200).send('book deleted'))
    .catch(next);
});

