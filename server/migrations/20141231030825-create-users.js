'use strict';
var dbm = require('db-migrate');
var type = dbm.dataType;

exports.up = function(db, callback) {
  db.createTable('Users', {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: type.STRING,
    email: {
      type: type.STRING,
      unique: true
    },
    role: {
      type: type.STRING,
      defaultValue: 'user'
    },
    password: type.STRING,
    provider: type.STRING,
    salt: type.STRING,
    facebook: type.STRING,
    twitter: type.STRING,
    google: type.STRING,
    github: type.STRING,
    created_at: type.TIMESTAMP,
    updated_at: type.TIMESTAMP
  }, callback);
};

exports.down = function(db, callback) {
  db.dropTable('Users', callback);
};
