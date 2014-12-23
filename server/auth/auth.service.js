'use strict';

var config = require('../config/environment');
var jwt = require('jsonwebtoken');
var expressJwt = require('express-jwt');
var compose = require('composable-middleware');
var sqldb = require('../sqldb');
var User = sqldb.User;
var Token = sqldb.Token;
var validateJwt = expressJwt({
  secret: config.secrets.session
});

/**
 * Attaches the user object to the request if authenticated
 * Otherwise returns 403
 */
function isAuthenticated() {
  return compose()
    // Validate jwt
    .use(function(req, res, next) {
      if (req.query && req.query.hasOwnProperty('access_token')) {
        req.headers.authorization = 'Bearer ' + req.query.access_token;
      }
      validateJwt(req, res, next);
    })
    // Attach user to request
    .use(function(req, res, next) {
      var isApiReq = req.user.api;
      var whereObj = {
        where: {
          id: req.user.id
        }
      };
      if (isApiReq) {
        var token = req.headers.authorization.replace('Bearer ', '');
        whereObj.include = {
          model: Token,
          where: {
            token: token
          }
        };
      }
      User.find(whereObj)
        .then(function(user) {
          if (!user) {
            return res.send(401);
          }
          req.user = user;
          next();
        })
        .catch(function(err) {
          return next(err);
        });
    });
}

/**
 * Checks if the user role meets the minimum requirements of the route
 */
function hasRole(roleRequired) {
  if (!roleRequired) {
    throw new Error('Required role needs to be set');
  }

  return compose()
    .use(isAuthenticated())
    .use(function meetsRequirements(req, res, next) {
      if (config.userRoles.indexOf(req.user.role) >=
        config.userRoles.indexOf(roleRequired)) {
        next();
      } else {
        res.send(403);
      }
    });
}

/**
 * Returns a jwt token signed by the app secret
 */
function signToken(id) {
  return jwt.sign({
    id: id
  }, config.secrets.session, {
    expiresInMinutes: 60 * 5
  });
}

/**
 * Returns a permanent jwt token signed by the app secret
 */
function signApiToken(id) {
  return jwt.sign({
    id: id,
    api: true,
  }, config.secrets.session);
}

/**
 * Set token cookie directly for oAuth strategies
 */
function setTokenCookie(req, res) {
  if (!req.user) {
    return res.json(404, {
      message: 'Something went wrong, please try again.'
    });
  }
  var token = signToken(req.user.id, req.user.role);
  res.cookie('token', JSON.stringify(token));
  res.redirect('/');
}

exports.isAuthenticated = isAuthenticated;
exports.hasRole = hasRole;
exports.signToken = signToken;
exports.signApiToken = signApiToken;
exports.setTokenCookie = setTokenCookie;
