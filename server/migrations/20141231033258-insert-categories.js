'use strict';
var async = require('async');

exports.up = function(db, callback) {
  async.series([
    db.insert.bind(db, 'Categories', ['id', 'name'], [1, 'Event']),
    db.insert.bind(db, 'Categories', ['id', 'name'], [2, 'Lesson Learned']),
    db.insert.bind(db, 'Categories', ['id', 'name'], [3, 'Personal Achievement']),
    db.insert.bind(db, 'Categories', ['id', 'name'], [4, 'Goal']),
    db.insert.bind(db, 'Categories', ['id', 'name'], [5, 'Family'])
  ], callback);
};

exports.down = function(db, callback) {
  async.series([
    db.dropTable.bind(db, 'Categories')
  ], callback);
};
