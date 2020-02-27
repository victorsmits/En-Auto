/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('CodePostal', {
    idCodePostal: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    Ville: {
      type: DataTypes.STRING(45),
      allowNull: true
    }
  }, {
    tableName: 'CodePostal'
  });
};
