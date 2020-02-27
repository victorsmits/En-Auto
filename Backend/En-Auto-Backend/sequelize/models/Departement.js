/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Departement', {
    idDepartement: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    Departement: {
      type: DataTypes.STRING(45),
      allowNull: true
    }
  }, {
    tableName: 'Departement'
  });
};
