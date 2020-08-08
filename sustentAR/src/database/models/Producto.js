module.exports = (sequelize, DataTypes) => {
    let alias = 'Productos'
    let cols = {
        id : {
          type : DataTypes.INTEGER(10).UNSIGNED,
          autoIncrement : true,
          primaryKey : true
        },
        nombre : {
          type : DataTypes.STRING(100),
          allowNull : false,
        },
        precio : {
          type : DataTypes.DECIMAL(6,3),
          allowNull : false,
        },
        stock : {
          type : DataTypes.INTEGER(10),
          allowNull : false
        },
        descuento : {
          type : DataTypes.INTEGER(10),
        },
        descripcion : {
         type : DataTypes.TEXT,
         allowNull : false
        },
        
    }
    let config = {
        tablename: 'productos',
        timestamps: true,
        underscored: true
    }
    const Productos = sequelize.define(alias, cols, config)

    Productos.associate = function(models){
      Productos.hasMany(models.Imagen_Productos, {
          as : 'imagen_productos',
          foreignKey: 'id_producto'
      })
    }
    // falta la relacion con la tabla productos_colores
    //agregar la relacion con carrito_pridctos

    return Productos
}