'use strict'; 

const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

const express = require('express');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(morgan());

// routes for books and characters

// catchall for undefined routes
app.all('*', (req,res) => res.sendStatus(404));

// error middleware
app.use(require('./error.js'));




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