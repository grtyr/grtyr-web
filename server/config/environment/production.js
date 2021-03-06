'use strict';

// Production specific configuration
// =================================
module.exports = {
  // Server IP
  ip: process.env.OPENSHIFT_NODEDIY_IP ||
    process.env.IP ||
    undefined,

  // Server port
  port: process.env.OPENSHIFT_NODEDIY_PORT ||
    process.env.PORT ||
    8080,

  // MongoDB connection options
  sequelize: {
    uri: process.env.OPENSHIFT_MYSQL_DB_URL + process.env.OPENSHIFT_APP_NAME,
    options: {
      define: {
        underscored: true
      }
    }
  },
  mongo: {
    uri: process.env.MONGOLAB_URI ||
      process.env.MONGOHQ_URL ||
      process.env.OPENSHIFT_MONGODB_DB_URL +
      process.env.OPENSHIFT_APP_NAME ||
      'mongodb://localhost/grtyr'
  }
};
