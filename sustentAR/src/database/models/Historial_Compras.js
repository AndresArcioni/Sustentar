module.exports = (sequelize, DataTypes) => {
    let alias = 'Historial_compras';
    let cols = {
        id : {
            type : DataTypes.INTEGER(10).UNSIGNED,
            primaryKey : true,
            autoIncrement : true
        }
    }
    let config = {
        tablename : 'historial_compras',
        timestamps : false,
        underscored : true
    }
    const Historial_compras = sequelize.define(alias, cols, config);
    
    Historial_compras.associate = function(models){
        
        Historial_compras.hasMany(modles.Carrito, {
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