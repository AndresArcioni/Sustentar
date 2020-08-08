'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
   return queryInterface.createTable('productos', {
     id : {
       type : Sequelize.DataTypes.INTEGER(10).UNSIGNED,
       autoIncrement : true,
       primaryKey : true
     },
     nombre : {
       type : Sequelize.DataTypes.STRING(100),
       allowNull : false,
     },
     precio : {
       type : Sequelize.DataTypes.DECIMAL(6,3),
       allowNull : false,
     },
     stock : {
       type : Sequelize.DataTypes.INTEGER(10),
       allowNull : false
     },
     descuento : {
       type : Sequelize.DataTypes.INTEGER(10),
     },
     descripcion : {
      type : Sequelize.DataTypes.TEXT,
      allowNull : false
     },
      created_at: Sequelize.DataTypes.DATE,
      updated_at: Sequelize.DataTypes.DATE
   })
  
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('productos') 
  }
};
