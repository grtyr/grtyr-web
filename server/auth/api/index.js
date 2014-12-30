'use strict';

var express = require('express');
var auth = require('../auth.service');
var Token = require('../../sqldb').Token;

var router = express.Router();

router.post('/', auth.isAuthenticated(), function(req, res, next) {
  var user_id = req.user.id;
  console.log(req.headers);
  var token = auth.signApiToken(user_id);
  Token
    .findOrCreate({
      where: {
        user_id: user_id,
        useragent: (req.headers['user-agent'] || '')
      },
      defaults: {
        token: token
      }
    })
    .then(function(token) {
      var created = token[1];
      token = token[0];
      var status = (created) ? 201 : 200;
      return res.status(status).json(token);
    })
    .catch(function(err) {
      next(err);
    });
});

module.exports = router;
