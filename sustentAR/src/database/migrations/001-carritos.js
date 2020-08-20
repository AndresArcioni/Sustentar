'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('carritos', {
      id:{
        type: Sequelize.DataTypes.INTEGER(10).UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
        unique: true
      },
        cantidad_productos: {
        type: Sequelize.DataTypes.INTEGER(30).UNSIGNED
      },
      total:{
        type: Sequelize.DataTypes.DECIMAL(6,2)
      }
    })
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('carritos');
  }
};
