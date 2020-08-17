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
          type : DataTypes.DECIMAL(6,2),
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
        id_categoria: {
          type : DataTypes.INTEGER(10),
          allowNull : false,
        },
        created_at: DataTypes.DATE,
        updated_at: DataTypes.DATE
    }
    let config = {
        tableName: 'productos',
        timestamps: true,
        underscored: true
    }
    const Producto = sequelize.define(alias, cols, config)

    Producto.associate = function(models){
      
      Producto.hasMany(models.Imagen_producto, {
          as : 'imagenes',
          foreignKey: 'id_producto'
      })
      Producto.belongsTo(models.Categoria, {
        as: 'categorias',
        foreignKey: 'id_categoria'
      })
      Producto.belongsToMany(models.Color, {
        as: 'colores',
        through: 'productos_colores',
        foreignKey: 'id_producto',
        otherKey: 'id_colores'
      })
      Producto.belongsToMany(models.Sustentabilidad, {
        as: 'sustentabilidad',
        through: 'productos_sustentabilidad',
        foreignKey: 'id_producto',
        otherKey: 'id'
      })
      Producto.belongsToMany(models.Carrito, {
        as: 'carrito',
        through: 'carrito_productos',
        foreignKey: 'id_producto',
        otherKey: 'id'
      })
    }

    return Producto
}