module.exports = (sequelize, DataTypes) => {
    let alias = 'ProductoCategoria'
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
        id_categoria: {
          type: DataTypes.INTEGER(10).UNSIGNED,
          allowNull : false
        }
    }
    let config = {
        tablename: 'productos_categorias',
        timestamps: false,
        underscores: true
    }
    
    const Productos_categoria = sequelize.define(alias, cols, config);

    return Productos_categoria;
}