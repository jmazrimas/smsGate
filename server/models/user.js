'use strict';
module.exports = function(sequelize, DataTypes) {
  var user = sequelize.define('user', {
    phone: DataTypes.STRING,
    name: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        user.hasMany(models.request);
      }
    }
  });
  return user;
};