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
    body: type.STRING,
    user_id: type.INTEGER,
    jar_id: type.INTEGER,
    category_id: type.INTEGER,
    created_at: type.TIMESTAMP,
    updated_at: type.TIMESTAMP
  }, callback);
};

exports.down = function(db, callback) {
  db.dropTable('Notes', callback);
};
