'use strict';
var async = require('async');

exports.up = function(db, callback) {
  async.series([
    db.addForeignKey.bind(db, 'Notes', 'Users', 'fk_Notes_Users', {
      'user_id': 'id'
    }, {
      onDelete: 'CASCADE'
    }),
    db.addForeignKey.bind(db, 'Tokens', 'Users', 'fk_Tokens_Users', {
      'user_id': 'id'
    }, {
      onDelete: 'CASCADE'
    })
  ], callback);
};

exports.down = function(db, callback) {
  async.series([
    db.removeForeignKey.bind(db, 'Comments', 'fk_Notes_Users'),
    db.removeForeignKey.bind(db, 'Tokens', 'fk_Tokens_Users')
  ], callback);
};
