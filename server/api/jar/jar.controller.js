'use strict';
var sqldb = require('../../sqldb');
var User = sqldb.User;
var Note = sqldb.Note;
var Jar = sqldb.Jar;

function stripBody(notes) {
  notes.forEach(function(note) {
    note.body = note._body;
    delete note._body;
  });
}

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
        include: {
          model: Note,
          attributes: ['id', 'body', 'created_at'],
          include: {
            model: User,
            attributes: userAttrs
          }
        }
      }
    })
    .success(function(user) {
      var jars = user.Jars;
      jars.forEach(function(jar) {
        jar.Notes.reverse();
        stripBody(jar.Notes);
      });
      return res.json(jars);
    });
};
