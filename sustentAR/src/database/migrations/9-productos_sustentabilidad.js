'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('productos_sustentabilidad', {
      id_producto: {
        type: Sequelize.DataTypes.INTEGER(10).UNSIGNED,
        allowNull : false, 
        references : {
          model : 'productos',
          key : 'id'
        }
      },
      id_sustentabilidad: {
        type: Sequelize.DataTypes.INTEGER(10).UNSIGNED,
        allowNull : false,
        references : {
          model : 'sustentabilidad',
          key : 'id'
        }
      }
    })
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('productos_sustentabilidad') 
  }
};
