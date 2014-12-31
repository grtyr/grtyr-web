'use strict';

var express = require('express');
var controller = require('./jar.controller');
var auth = require('../../auth/auth.service');
var router = express.Router();

router.get('/', auth.hasRole('admin'), controller.index);
router.get('/mine', auth.isAuthenticated(), controller.mine);

module.exports = router;
