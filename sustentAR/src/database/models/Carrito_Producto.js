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
          allowNull : true
        },
        id_carrito: {
          type: DataTypes.INTEGER(10).UNSIGNED,
          allowNull : true
        }
    }
    let config = {
        tableName: 'carrito_productos',
        timestamps: false,
        underscored: true
    }
    const Carrito_productos = sequelize.define(alias, cols, config);

    return Carrito_productos;
}