'use strict';

var sqldb = require('../../sqldb');
var Token = sqldb.Token;
var sequelize = sqldb.sequelize;
var common = require('../common/controller');

// Gets list of tokens from the DB.
exports.index = function(req, res) {
  Token
    .findAll({
      order: 'createdAt DESC'
    })
    .success(function(tokens) {
      return res.json(tokens);
    });
};

exports.destroy = function(req, res) {
  Token
    .destroy({
      where: sequelize.and({
        user_id: req.user.id
      }, {
        token: req.query.token
      })
    })
    .then(function() {
      console.log(arguments);
      return res.status(204).end();
    })
    .catch(common.handleError(res));
};

exports.mine = function(req, res) {
  Token
    .findAll({
      where: {
        user_id: req.user.id
      },
      order: 'createdAt DESC'
    })
    .success(function(tokens) {
      return res.json(tokens);
    });
};
