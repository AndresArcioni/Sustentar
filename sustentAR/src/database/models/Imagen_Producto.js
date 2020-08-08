module.exports = (sequelize, DataTypes) => {
    let alias = 'Imagen_productos'
    let cols = {
        id:{
          type: Sequelize.DataTypes.INTEGER(10).UNSIGNED,
          primaryKey: true,
          autoIncrement: true,
          unique: true
        },
        nombre:{
          type: Sequelize.DataTypes.STRING(225)
        }
    }
    let config = {
        tablename: 'imagen_producto',
        timestamps: false,
    }
    const Imagen_Productos = sequelize.define(alias, cols, config)
    
    Imagen_Productos.associate = function(models){
        Imagen_Productos.belongsTo(models.Producto, {
            as : 'productos',
            foreignKey : 'id_producto'
        })
    }

    return Imagen_Productos
}