'use strict';
var Category = require('../../sqldb').Category;

// Gets list of categories from the DB.
exports.index = function(req, res) {
  Category
    .findAll()
    .success(function(categories) {
      return res.json(categories);
    });
};
