'use strict';

module.exports = (err, req, res, next) => {
  console.log('ERR', err);

  if (err.statusCode) res.sendStatus(err.statusCode);
  res.sendStatus(500);
};