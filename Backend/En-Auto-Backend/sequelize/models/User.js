/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('User', {
    idUser: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    Lastname: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    Firstname: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    Email: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    Password: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    idAdresse: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Adresse',
        key: 'idAdresse'
      }
    }
  }, {
    tableName: 'User'
  });
};
