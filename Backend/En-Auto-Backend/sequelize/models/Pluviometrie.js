/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Pluviometrie', {
    idPluviometrie: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    Date: {
      type: DataTypes.DATE,
      allowNull: true
    },
    Volume: {
      type: DataTypes.INTEGER(11),
      allowNull: true
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
    tableName: 'Pluviometrie'
  });
};
