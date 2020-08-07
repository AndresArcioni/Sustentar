'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('carrito', {
      id:{
        type: Sequelize.DataTypes.INTEGER(10).UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
        unique: true
      },
      total:{
        type: Sequelize.DataTypes.INTEGER(10)
      }
    })
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('carrito');
  }
};
