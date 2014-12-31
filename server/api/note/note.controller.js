'use strict';

var sqldb = require('../../sqldb');
var sequelize = sqldb.sequelize;
var Note = sqldb.Note;
var Category = sqldb.Category;
var common = require('../common/controller');
var ONE_DAY = (60 * 60 * 24),
  ONE_DAY_MS = (ONE_DAY * 1000);

function flattenDate(date) {
  var d = new Date(date);
  d.setHours(12, 0, 0, 0)
  return d.getTime();
}

function findLongestStreak(notes) {
  var dates = [],
    len = notes.length;
  for (var i = 0; i < len; i++) {
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
      if ((+b - +a) > ONE_DAY) {
        sorted[++k] = []
      }
    });
  sorted.sort(function(a, b) {
    return a.length > b.length ? -1 : 1;
  });
  return sorted[0].length;
}

function hideOldNotes(notes) {
  var i, length = notes.length,
    oneDayAgo = (Date.now() - ONE_DAY_MS);
  for (i = 0; i < length; i++) {
    notes[i] = notes[i].toJSON();
    notes[i].canEdit = true;
    var d = new Date(notes[i].createdAt).getTime();
    if (d < oneDayAgo) {
      notes[i].body = '...';
      notes[i].canEdit = false;
    }
  }
  return notes;
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

exports.mine = function(req, res) {
  Note
    .findAll({
      where: {
        author_id: req.user.id
      },
      include: Category,
      order: 'createdAt DESC'
    })
    .success(function(notes) {
      return res.json({
        streak: findLongestStreak(notes),
        notes: hideOldNotes(notes)
      });
    });
};

exports.init = function(req, res) {
  var yearFn = sequelize.fn('year', sequelize.col('createdAt')),
    countFn = sequelize.fn('count', sequelize.col('*'));
  Note
    .findAll({
      where: {
        author_id: req.user.id
      },
      group: [yearFn],
      attributes: [
        [countFn, 'count'],
        [yearFn, 'year']
      ]
    })
    .success(function(years) {
      res.json(years);
    });
};

// Creates a new note in the DB.
exports.create = function(req, res) {
  req.body.author_id = req.user.id;
  Note
    .create(req.body)
    .then(function(note) {
      note = note.toJSON();
      note.canEdit = true;
      return res.status(201).json(note);
    })
    .catch(common.handleError(res));
};

// Updates a note in the DB.
exports.update = function(req, res) {
  Note
    .findOne({
      where: sequelize.and({
        author_id: req.user.id
      }, {
        id: req.params.id
      })
    }).then(function(note) {
      if (!note) {
        return res.send(404);
      }
      note.updateAttributes(req.body);
      res.json(note);
    });
};
