module.exports = (sequelize, DataTypes) => {
    let alias = 'Historial_producto';
    let cols = {
        id : {
            type : DataTypes.INTEGER(10).UNSIGNED,
            primaryKey : true,
            autoIncrement : true
        },
        id_producto: {
            type: DataTypes.INTEGER(10).UNSIGNED,
            allowNull : true
        },
        cantidad_productos: {
            type: DataTypes.INTEGER(30).UNSIGNED
        },
        id_historial_compras: {
            type : DataTypes.INTEGER(10).UNSIGNED,
            allowNull: true
        }
    }
    let config = {
        tableName : 'historial_productos',
        timestamps : false
    }
    const Historial_producto = sequelize.define(alias, cols, config);
    
    return Historial_producto;
}