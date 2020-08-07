'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('usuarios', {
      id:{
        type: Sequelize.DataTypes.INTEGER(10).UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
        unique: true
      },
      rol:{
        type: Sequelize.DataTypes.INTEGER(10).UNSIGNED,
        allowNull: false
      },
      nombre:{
        type: Sequelize.DataTypes.STRING(225),
        allowNull:false
      },
      apellido:{
        type: Sequelize.DataTypes.STRING(225),
        allowNull:false
      },
      email:{
        type: Sequelize.DataTypes.STRING(225),
        allowNull: false,
        unique: true
      },
      contrasenia:{
        type: Sequelize.DataTypes.STRING(225),
        allowNull: false
      },
      dni: Sequelize.DataTypes.INTEGER(10).UNSIGNED,

      domicilio: Sequelize.DataTypes.STRING(100),

      codigo_postal: Sequelize.DataTypes.INTEGER(10).UNSIGNED,
      
      entre_calles: Sequelize.DataTypes.STRING(225),
      
      departamento: Sequelize.DataTypes.STRING(45),
      
      ciudad: Sequelize.DataTypes.STRING(45),
      
      telefono: Sequelize.DataTypes.INTEGER(10),

      imagen_usuario: Sequelize.DataTypes.STRING(225),
      
      carrito_id: {
        type: Sequelize.DataTypes.INTEGER(10).UNSIGNED,
        allowNull: false,
        references: {
          model: 'carrito',
          key: 'id'
        }
      },
      historial_compras_id: {
        type: Sequelize.DataTypes.INTEGER(10).UNSIGNED,
        allowNull: false,
        references: {
          model: 'historial_compras',
          key: 'id'
        }
      },
      created_at: Sequelize.DataTypes.DATE,

      updated_at: Sequelize.DataTypes.DATE
    })
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('usuarios')
  }
};
