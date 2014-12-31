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
      allowNull: false
    },
    category_id: {
      type: DataTypes.INTEGER
    }
  });

  Note.associate = function(models) {
    models.Note.belongsTo(models.User, {
      foreignKey: 'author_id'
    });
    models.Note.belongsTo(models.Category, {
      foreignKey: 'category_id'
    });
  };

  return Note;
};
