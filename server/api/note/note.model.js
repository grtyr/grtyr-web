'use strict';

module.exports = function(sequelize, DataTypes) {
  var Note = sequelize.define('Note', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    body: DataTypes.STRING,
    author_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  });

  Note.associate = function(models) {
    models.Note.belongsTo(models.User, {
      foreignKey: 'author_id'
    });
  };

  return Note;
};
