module.exports = (sequelize, DataTypes) => {
    let alias = 'Productos_colores'
    let cols = {
        id: {
            type: DataTypes.INTEGER(10).UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            unique: true
        },
        id_producto: {
          type: DataTypes.INTEGER(10).UNSIGNED,
          allowNull : false
        },
        id_colores: {
          type: DataTypes.INTEGER(10).UNSIGNED,
          allowNull: false
        }
    }
    let config = {
        tablename: 'productos_colores',
        timestamps: false,
        underscored: true,
        freezeTableName: true
    }
    
    const Producto_color = sequelize.define(alias, cols, config);

    return Producto_color;
}