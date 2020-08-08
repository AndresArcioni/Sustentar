module.exports = (sequelize, DataTypes) => {
    let alias = 'Carrito_productos'
    let cols = {
        id_producto: {
          type: Sequelize.DataTypes.INTEGER(10).UNSIGNED,
          allowNull : false
        },
        id_carrito: {
          type: Sequelize.DataTypes.INTEGER(10).UNSIGNED,
          allowNull : false
        }
    }
    let config = {
        tablename: 'carrito_productos',
        timestamps: false,
        underscores: true
    }
    const Carrito_productos = sequelize.define(alias, cols, config);

    Carrito_productos.associate = function(models){
        Carrito_Producto.belongsToMany(models.Carrito, {
            as: 'carrito',
            through: 'carrito_productos',
            foreignKey: 'id_carrito',
            otherKey: 'id'
        })
        
        Carrito_productos.belongsToMany(models.Producto, {
            as: 'productos',
            through: 'carrito_productos',
            foreignKey: 'id_producto',
            otherKey: 'id'
        })
    }

    return Carrito_productos;
}