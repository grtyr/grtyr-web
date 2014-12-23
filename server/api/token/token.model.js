'use strict';

module.exports = function(sequelize, DataTypes) {
  var Token = sequelize.define('Token', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    token: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    useragent: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  });

  Token.associate = function(models) {
    models.Token.belongsTo(models.User, {
      foreignKey: 'user_id'
    });
  };

  return Token;
};
