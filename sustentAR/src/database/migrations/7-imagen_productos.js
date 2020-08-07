'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('imagen_productos',{
      id:{
        type: Sequelize.DataTypes.INTEGER(10).UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
        unique: true
      },
      nombre:{
        type: Sequelize.DataTypes.STRING(225)
      },
      id_producto:{
        type: Sequelize.DataTypes.INTEGER(10).UNSIGNED,
        references: {
          model: 'productos',
          key: 'id'
        }
      }
    })
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('imagen_productos');
  }
};