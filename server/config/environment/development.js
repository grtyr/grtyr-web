'use strict';

// Development specific configuration
// ==================================
module.exports = {
  // MongoDB connection options
  mongo: {
    uri: 'mongodb://localhost/grtyr-dev'
  },
  sequelize: {
    uri: 'mysql://root:@localhost:3306/grtyr-dev',
    options: {
      logging: true
    }
  }
};
