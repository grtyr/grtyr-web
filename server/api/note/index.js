'use strict';

var express = require('express');
var controller = require('./note.controller');
var auth = require('../../auth/auth.service');

var router = express.Router();
router.get('/', auth.hasRole('admin'), controller.index);
router.get('/init', auth.isAuthenticated(), controller.init);
router.get('/mine', auth.isAuthenticated(), controller.mine);
router.post('/', auth.isAuthenticated(), controller.create);
router.put('/:id', auth.isAuthenticated(), controller.update);

module.exports = router;
