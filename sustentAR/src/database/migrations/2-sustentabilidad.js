'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('sustentabilidad',{
      id:{
        type: Sequelize.DataTypes.INTEGER(10).UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
        unique: true
      },
      nombre:{
        type: Sequelize.DataTypes.STRING(150)
      }
    })
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('sustentabilidad');
  }
};

