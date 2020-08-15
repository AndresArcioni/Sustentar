module.exports = (sequelize, DataTypes) => {
    let alias = 'Producto'
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
      
      Productos.hasMany(models.ImagenProducto, {
          as : 'imagenes',
          foreignKey: 'id_producto'
      })
      Productos.belongsToMany(models.Color, {
        as: 'colores',
        through: 'producto_colores',
        foreignKey: 'id_colores',
        otherKey: 'id'
      })
      Productos.belongsToMany(models.Sustentabilidad, {
        as: 'sustentabilidad',
        through: 'productos_sustentabilidad',
        foreignKey: 'id_producto',
        otherKey: 'id'
      })
      Productos.belongsToMany(models.Categoria, {
        as: 'categorias',
        through: 'productos_categorias',
        foreignKey: 'id_producto',
        otherKey: 'id'
      })
      Productos.belongsToMany(models.Carrito, {
        as: 'carrito',
        through: 'carrito_productos',
        foreignKey: 'id_producto',
        otherKey: 'id'
      })
    }

    return Productos
}