'use strict';
var dbm = require('db-migrate');
var type = dbm.dataType;

exports.up = function(db, callback) {
  db.createTable('Notes', {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    body: {
      type: type.STRING
    },
    author_id: {
      type: type.INTEGER
    },
    category_id: {
      type: type.INTEGER
    },
    createdAt: {
      type: type.TIMESTAMP
    },
    updatedAt: {
      type: type.TIMESTAMP
    }
  }, callback);
};

exports.down = function(db, callback) {
  db.dropTable('Notes', callback);
};
