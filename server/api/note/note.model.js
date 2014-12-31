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
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    category_id: {
      type: DataTypes.INTEGER
    }
  });

  Note.associate = function(models) {
    models.Note.belongsTo(models.User);
    models.Note.belongsTo(models.Category);
  };

  return Note;
};
