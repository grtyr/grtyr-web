'use strict';

var express = require('express');
var controller = require('./jar.controller');

var router = express.Router();

router.get('/', controller.index);

module.exports = router;
