'use strict';
module.exports = function(sequelize, DataTypes) {
  var user = sequelize.define('user', {
    name: DataTypes.TEXT,
    title: DataTypes.TEXT,
    quote: DataTypes.TEXT,
    img: DataTypes.TEXT,
    email: DataTypes.TEXT,
    password: DataTypes.TEXT
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return user;
};