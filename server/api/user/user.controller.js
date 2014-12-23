'use strict';

var sqldb = require('../../sqldb');
var User = sqldb.User;
var config = require('../../config/environment');
var jwt = require('jsonwebtoken');
var common = require('../common/controller');

/**
 * Get list of users
 * restriction: 'admin'
 */
exports.index = function(req, res) {
  User.findAll({
      attributes: [
        'id',
        'name',
        'email',
        'role',
        'provider'
      ]
    })
    .then(function(users) {
      res.json(200, users);
    })
    .catch(common.handleError(res));
};

/**
 * Creates a new user
 */
exports.create = function(req, res) {
  var newUser = User.build(req.body);
  newUser.setDataValue('provider', 'local');
  newUser.setDataValue('role', 'user');
  newUser.save()
    .then(function(user) {
      var token = jwt.sign({
        id: user.id
      }, config.secrets.session, {
        expiresInMinutes: 60 * 5
      });
      res.json({
        token: token
      });
    })
    .catch(common.validationError(res));
};

/**
 * Get a single user
 */
exports.show = function(req, res, next) {
  var userId = req.params.id;

  User.find({
      where: {
        id: userId
      }
    })
    .then(function(user) {
      if (!user) {
        return res.send(404);
      }
      res.json(user.profile);
    })
    .catch(function(err) {
      return next(err);
    });
};

/**
 * Deletes a user
 * restriction: 'admin'
 */
exports.destroy = function(req, res) {
  User.destroy({
      id: req.params.id
    })
    .then(common.respondWith(res, 204))
    .catch(common.handleError(res));
};

/**
 * Change a users password
 */
exports.changePassword = function(req, res) {
  var userId = req.user.id;
  var oldPass = String(req.body.oldPassword);
  var newPass = String(req.body.newPassword);

  User.find({
      where: {
        id: userId
      }
    })
    .then(function(user) {
      if (user.authenticate(oldPass)) {
        user.password = newPass;
        return user.save()
          .then(common.respondWith(res, 200))
          .catch(common.validationError(res));
      } else {
        return res.send(403);
      }
    });
};

/**
 * Get my info
 */
exports.me = function(req, res, next) {
  var userId = req.user.id;

  User.find({
      where: {
        id: userId
      },
      attributes: [
        'id',
        'name',
        'email',
        'role',
        'provider'
      ]
    })
    .then(function(user) { // don't ever give out the password or salt
      if (!user) {
        return res.json(401);
      }
      res.json(user);
    })
    .catch(function(err) {
      return next(err);
    });
};

/**
 * Authentication callback
 */
exports.authCallback = function(req, res) {
  res.redirect('/');
};
