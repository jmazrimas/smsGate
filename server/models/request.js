'use strict';
module.exports = function(sequelize, DataTypes) {
  var request = sequelize.define('request', {
    actioned: DataTypes.BOOLEAN,
    userId: DataTypes.INTEGER,
    message: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        request.belongsTo(models.user);
      }
    }
  });
  return request;
};