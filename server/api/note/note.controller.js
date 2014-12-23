'use strict';

var sqldb = require('../../sqldb');
var sequelize = sqldb.sequelize;
var Note = sqldb.Note;
var common = require('../common/controller');

function canWrite(user, cb) {
  Note
    .count({
      where: sequelize.and({
        author_id: user.id
      }, ['date(`createdAt`) = CURRENT_DATE'])
    })
    .success(function(count) {
      if (count === 0) {
        return cb(true);
      }
      cb(false);
    });
}

function flattenDate(date) {
  var d = new Date(date);
  d.setHours(12, 0, 0, 0)
  return d.getTime();
}

function findLongestStreak(notes) {
  var dates = [],
    len = notes.length,
    i;
  for (i = 0; i < len; i++) {
    dates.push(flattenDate(notes[i].createdAt));
  }
  var k = 0,
    sorted = [
      []
    ];
  dates.sort()
    .forEach(function(val, idx) {
      var a = val,
        b = dates[idx + 1] || 0;
      sorted[k].push(+a);
      if ((+b - +a) > 86400000) {
        sorted[++k] = []
      }
    });
    sorted.sort(function(a, b) {
      return a.length > b.length ? -1 : 1;
    });
  return sorted[0].length;
}

// Gets list of notes from the DB.
exports.index = function(req, res) {
  Note
    .findAll({
      order: 'createdAt DESC'
    })
    .success(function(notes) {
      return res.json(notes);
    });
};

exports.canWrite = function(req, res) {
  canWrite(req.user, function(can) {
    res.json({
      can: can
    });
  })
};

exports.mine = function(req, res) {
  Note
    .findAll({
      where: {
        author_id: req.user.id
      },
      order: 'createdAt DESC'
    })
    .success(function(notes) {
      return res.json({
        streak: findLongestStreak(notes),
        notes: notes
      });
    });
};

// Creates a new note in the DB.
exports.create = function(req, res) {
  req.body.author_id = req.user.id;
  Note
    .create(req.body)
    .then(function(note) {
      return res.status(201).json(note);
    })
    .catch(common.handleError(res));
};
