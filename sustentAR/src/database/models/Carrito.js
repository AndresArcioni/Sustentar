module.exports = (sequelize, DataTypes) => {
    let alias = 'Carrito'
    let cols = {
        id : {
            type: DataTypes.INTEGER(10).UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            unique: true
        },
        cantidad_productos: {
            type: DataTypes.INTEGER(30).UNSIGNED
        },
        total : {
            type: DataTypes.DECIMAL(6,2)
        }
    }
    let config = {
        tableName : 'carritos',
        timestamps : false,
        underscored: true
    }
    const Carrito = sequelize.define(alias, cols, config);

    Carrito.associate = function(models){
        Carrito.belongsTo(models.Historial_Compras, {
            as : 'historial_compras',
            foreignKey: 'id_carrito'
        })
    }

    Carrito.associate = function(models){
        Carrito.belongsTo(models.Usuario, {
            as : 'usuario',
            foreignKey : 'carrito_id'
        })



        Carrito.belongsToMany(models.Producto, {
            as: 'productos',
            through: 'carrito_productos',
            foreignKey: 'id_producto',
            otherKey: 'id'
        })
    }


    return Carrito;
}