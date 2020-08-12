module.exports = (sequelize, DataTypes) => {
    let alias = 'Carrito_productos'
    let cols = {
        id:{
            type: DataTypes.INTEGER(10).UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            unique: true
        },
        id_producto: {
          type: DataTypes.INTEGER(10).UNSIGNED,
          allowNull : false
        },
        id_carrito: {
          type: DataTypes.INTEGER(10).UNSIGNED,
          allowNull : false
        }
    }
    let config = {
        tablename: 'carrito_productos',
        timestamps: false,
        underscores: true
    }
    const Carrito_productos = sequelize.define(alias, cols, config);

    return Carrito_productos;
}