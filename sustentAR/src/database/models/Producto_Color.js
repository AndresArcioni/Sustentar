module.exports = (sequelize, DataTypes) => {
    let alias = 'Producto_color'
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
        underscores: true
    }
    
    const Productos_Colores = sequelize.define(alias, cols, config);

    return Productos_Colores;
}