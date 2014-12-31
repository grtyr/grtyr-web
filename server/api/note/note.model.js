'use strict';

var ONE_DAY = (60 * 60 * 24),
  ONE_DAY_MS = (ONE_DAY * 1000);

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
    jar_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    category_id: {
      type: DataTypes.INTEGER
    }
  }, {
    getterMethods: {
      _body: function() {
        if (this.canEdit) {
          return this.body;
        }
        return '...';
      },
      canEdit: function() {
        var oneDayAgo = (Date.now() - ONE_DAY_MS);
        var d = new Date(this.created_at).getTime();
        return (d > oneDayAgo);
      }
    },
  });

  Note.associate = function(models) {
    models.Note.belongsTo(models.User);
    models.Note.belongsTo(models.Jar);
    models.Note.belongsTo(models.Category);
  };

  return Note;
};
