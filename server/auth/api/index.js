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
    .create({
      token: token,
      user_id: user_id,
      useragent: (req.headers['user-agent'] || '')
    })
    .then(function(token) {
      return res.status(201).json(token);
    })
    .catch(function(err) {
      next(err);
    });
});

module.exports = router;
