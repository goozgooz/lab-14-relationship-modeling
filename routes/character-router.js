'use strict';

const express = require('express');
const jsonParser = require('body-parser').json();
const Character = require('../models/character.js');

const characterRouter = module.exports = express.Router();


// post a character
characterRouter.post('/characters', jsonParser, (req, res, next) => {
  if(!req.body.name) return res.status(400).send('no character name given');
  let newCharacter = new Character(req.body);
  newCharacter.save()
    .then(res.send.bind(res))
    .catch(next);
});

// get all characters
characterRouter.get('/characters', (req, res, next) => {
  Character.find({})
    .then(res.send.bind(res))
    .catch(next);
});

// get one character
characterRouter.get('/characters/:id', (req, res, next) => {
  Character.findOne({_id: req.params.id})
    .then(character => {
      if(character === null) res.status(404).send('that character id does not exsist');
      res.status(200).send(character);
    })
    .catch(next);
});

// delete one character
characterRouter.delete('/characters/:id', (req, res, next) => {
  Character.remove({_id: req.params.id})
    .then(res.status(200).send('character deleted'))
    .catch(next);
});