'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('carrito_productos', {
      id:{
        type: Sequelize.DataTypes.INTEGER(10).UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
        unique: true
      },
      id_producto: {
        type: Sequelize.DataTypes.INTEGER(10).UNSIGNED,
        allowNull : true,
        references : {
          model : 'productos',
          key : 'id'
        }
      },
      cantidad_productos: {
        type: Sequelize.DataTypes.INTEGER(30).UNSIGNED
      },
      id_carrito: {
        type: Sequelize.DataTypes.INTEGER(10).UNSIGNED,
        allowNull : true,
        references : {
          model : 'carritos',
          key : 'id'
        }
      }
    })
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('carrito_productos') 
  }
};