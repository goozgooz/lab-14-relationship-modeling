'use strict'; 

const mongoose = require('mongoose');
mongoose.Promise = Promise;

require('dotenv').config();
const express = require('express');


const app = express();

let server = null;

module.exports = {
  start: () => {
    return new Promise((resolve,reject) => {
      if(server) {
        return reject(new Error('Server is already running!'));
      }
      server = app.listen(process.env.PORT || 3000, () => {
        console.log('Server up!');
        resolve();
      });
    })
      .then(() => {
        mongoose.connect(process.env.MONGODB_URI, {useMongoClient: true});
      });
  },

  stop: () => {
    return new Promise((resolve, reject) => {
      if(!server) {
        return reject(new Error('Server is already shut down'));
      }
      server.close(() => {
        server = null;
        console.log('server closed');
        resolve();
      });
    })
      .then(() => mongoose.disconnect());
  },
};