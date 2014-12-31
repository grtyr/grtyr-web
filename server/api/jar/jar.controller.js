'use strict';
var sqldb = require('../../sqldb');
var User = sqldb.User;
var Note = sqldb.Note;
var Jar = sqldb.Jar;

// Gets list of jars from the DB.
exports.index = function(req, res) {
  Jar
    .findAll()
    .success(function(jars) {
      return res.json(jars);
    });
};

exports.mine = function(req, res) {
  var userAttrs = ['id', 'name', 'email'];
  User
    .find({
      where: {
        id: req.user.id
      },
      attributes: userAttrs,
      include: {
        model: Jar,
        attributes: ['id', 'name', 'description'],
        include: {
          model: Note,
          include: {
            model: User,
            attributes: userAttrs,
          },
        }
      }
    })
    .success(function(user) {
      return res.json(user.Jars);
    });
};
