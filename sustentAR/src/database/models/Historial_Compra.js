module.exports = (sequelize, DataTypes) => {
    let alias = 'Historial_compra';//Camelcase?
    let cols = {
        id : {
            type : DataTypes.INTEGER(10).UNSIGNED,
            primaryKey : true,
            autoIncrement : true
        },
        id_carrito: {
            type : DataTypes.INTEGER(10).UNSIGNED,
            allowNull: false
        }
    }
    let config = {
        tableName : 'historial_compras',
        timestamps : false
    }
    const Historial_compras = sequelize.define(alias, cols, config);
    
    Historial_compras.associate = function(models){
        
        Historial_compras.hasMany(models.Carrito, {
            as: 'carrito',
            foreignKey: 'id_carrito'
        })

        Historial_compras.belongsTo(models.Usuario, {
            as : 'usuario',
            foreignKey : 'historial_compras_id'
        })
    }

    return Historial_compras;
}