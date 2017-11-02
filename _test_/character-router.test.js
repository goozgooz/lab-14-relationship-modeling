/*global expect beforeAll afterAll afterEach */
'use strict';

process.env.PORT = 6969;
process.env.MONGODB_URI = 'mongodb://localhost/test';

const request = require('superagent');
const server = require('../lib/server.js');
const Character = require('../models/character.js');

let url = ('http://localhost:6969/api/characters');
let kvothe = {name:'kvothe'};
let badGuy = {cool:'beans'};

describe('character-router', () => {
  beforeAll(server.start);
  afterAll(server.stop);
  afterEach(() => {
    return Character.remove({});
  });
  
  describe('post routes', () => {
    test('should return 200 and character name', () => {
      return request.post(url)
        .send(kvothe)
        .then(res => {
          expect(res.status).toBe(200);
          expect(res.body.name).toBe(kvothe.name);
        });
    });
    test('should return 400 if no name given', () => {
      return request.post(url)
        .send(badGuy)
        .catch(res => {
          expect(res.status).toBe(400);
        });
    });
  });
  
});

