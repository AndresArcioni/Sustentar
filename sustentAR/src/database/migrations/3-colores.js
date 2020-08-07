'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('colores', {
      id:{
        type: Sequelize.DataTypes.INTEGER(10).UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
        unique: true
      },
      nombre:{
        type: Sequelize.DataTypes.STRING(225)
      }
    })
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('colores')
  }
};
