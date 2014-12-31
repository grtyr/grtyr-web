'use strict';
var dbm = require('db-migrate');
var type = dbm.dataType;

exports.up = function(db, callback) {
  db.createTable('Tokens', {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    token: {
      type: type.STRING
    },
    user_id: {
      type: type.INTEGER
    },
    useragent: {
      type: type.STRING
    },
    created_at: {
      type: type.TIMESTAMP
    },
    updated_at: {
      type: type.TIMESTAMP
    }
  }, callback);
};

exports.down = function(db, callback) {
  db.dropTable('Tokens', callback);
};
