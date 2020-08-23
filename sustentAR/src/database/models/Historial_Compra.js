module.exports = (sequelize, DataTypes) => {
    let alias = 'Historial_compra';
    let cols = {
        id : {
            type : DataTypes.INTEGER(10).UNSIGNED,
            primaryKey : true,
            autoIncrement : true
        },
        id_carrito: {
            type : DataTypes.INTEGER(10).UNSIGNED,
            allowNull: false
        },
        id_producto: {
            type: DataTypes.INTEGER(10).UNSIGNED,
            allowNull : true
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

        //id_historial_compras
        Historial_compras.belongsToMany(models.Producto, {
            as: 'productos',
            through: 'historial_productos',
            foreignKey: 'id_producto',
            otherKey: 'id_historial_compras'
        })
    }

    return Historial_compras;
}