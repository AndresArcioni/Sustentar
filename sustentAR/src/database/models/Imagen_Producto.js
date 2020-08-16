module.exports = (sequelize, DataTypes) => {
    let alias = 'Imagen_producto'
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
        tableName: 'imagen_productos',
        timestamps: false,
    }
    const Imagen_producto = sequelize.define(alias, cols, config)
    
    Imagen_producto.associate = function(models){
        Imagen_producto.belongsTo(models.Producto, {
            as : 'productos',
            foreignKey : 'id_producto'
        })
    }

    return Imagen_producto
}