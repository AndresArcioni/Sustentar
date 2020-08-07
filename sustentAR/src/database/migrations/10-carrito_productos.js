'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('carrito_productos', {
      id_producto: {
        type: Sequelize.DataTypes.INTEGER(10).UNSIGNED,
        allowNull : false,
        references : {
          model : 'productos',
          key : 'id'
        }
      },
      id_carrito: {
        type: Sequelize.DataTypes.INTEGER(10).UNSIGNED,
        allowNull : false,
        references : {
          model : 'carrito',
          key : 'id'
        }
      }
    })
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('carrito_productos') 
  }
};