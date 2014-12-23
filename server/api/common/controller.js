'use strict';

exports.validationError = function(res, statusCode) {
  statusCode = statusCode || 422;
  return function(err) {
    res.status(statusCode).json(err);
  };
};

exports.handleError = function(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
};

exports.respondWith = function(res, statusCode) {
  statusCode = statusCode || 200;
  return function() {
    res.status(statusCode).end()
  };
};
