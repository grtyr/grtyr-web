'use strict';

var express = require('express');
var controller = require('./note.controller');
var auth = require('../../auth/auth.service');

var router = express.Router();

router.get('/', auth.hasRole('admin'), controller.index);
router.get('/canWrite', auth.isAuthenticated(), controller.canWrite);
router.get('/mine', auth.isAuthenticated(), controller.mine);
router.post('/', auth.isAuthenticated(), controller.create);

module.exports = router;
