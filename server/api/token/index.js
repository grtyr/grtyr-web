'use strict';

var express = require('express');
var controller = require('./token.controller');
var auth = require('../../auth/auth.service')

var router = express.Router();

router.get('/', auth.hasRole('admin'), controller.index);
router.delete('/', auth.isAuthenticated(), controller.destroy);
router.get('/mine', auth.isAuthenticated(), controller.mine);

module.exports = router;
