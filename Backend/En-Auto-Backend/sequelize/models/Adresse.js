/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Adresse', {
    idAdresse: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    Rue: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    Numero: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    idCodePostal: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'CodePostal',
        key: 'idCodePostal'
      }
    },
    idDepartement: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Departement',
        key: 'idDepartement'
      }
    }
  }, {
    tableName: 'Adresse'
  });
};
