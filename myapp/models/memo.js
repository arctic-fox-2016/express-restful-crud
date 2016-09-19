'use strict';
module.exports = function(sequelize, DataTypes) {
  var Memo = sequelize.define('Memo', {
    name: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Memo;
};