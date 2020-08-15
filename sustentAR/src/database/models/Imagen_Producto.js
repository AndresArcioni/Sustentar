module.exports = (sequelize, DataTypes) => {
    let alias = 'ImagenProducto'
    let cols = {
        id:{
          type: DataTypes.INTEGER(10).UNSIGNED,
          primaryKey: true,
          autoIncrement: true,
          unique: true
        },
        nombre:{
          type: DataTypes.STRING(225)
        },
        id_producto:{
            type: DataTypes.INTEGER(10).UNSIGNED
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