'use strict';

module.exports = function(sequelize, DataTypes) {
  var Jar = sequelize.define('Jar', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: DataTypes.STRING,
    description: DataTypes.STRING
  });

  Jar.associate = function(models) {
    models.Jar.hasMany(models.User, {
      foreignKey: 'jar_id'
    });
  };

  return Jar;
};
