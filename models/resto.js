'use strict';
module.exports = function(sequelize, DataTypes) {
  var Resto = sequelize.define('Resto', {
    name: DataTypes.STRING,
    category: DataTypes.STRING,
    picture: DataTypes.STRING,
    id_foodcourt: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Resto;
};