'use strict';

// Test specific configuration
// ===========================
module.exports = {
  // MongoDB connection options
  mongo: {
    uri: 'mongodb://localhost/grtyr-test'
  },
  sequelize: {
    uri: 'mysql://root:@localhost:3306/grtyr-test',
    options: {
      logging: false,
      define: {
        underscored: true
      }
    }
  }
};
