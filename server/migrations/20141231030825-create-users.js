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
    name: {
      type: type.STRING
    },
    email: {
      type: type.STRING,
      unique: true
    },
    role: {
      type: type.STRING,
      defaultValue: 'user'
    },
    password: {
      type: type.STRING
    },
    provider: {
      type: type.STRING
    },
    salt: {
      type: type.STRING
    },
    facebook: {
      type: type.STRING
    },
    twitter: {
      type: type.STRING
    },
    google: {
      type: type.STRING
    },
    github: {
      type: type.STRING
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
  db.dropTable('Users', callback);
};
