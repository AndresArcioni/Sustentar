module.exports = (sequelize, DataTypes) => {
    let alias = 'carrito'
    let cols = {
        id : {
            type: DataTypes.INTEGER(10).UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            unique: true
        },
        total : {
            type: DataTypes.INTEGER(10)
        }
    }
    let config = {
        tablename : 'carrito',
        timestamp : false
    }
    const Carrito = sequelize.defin(alias, cols, config);

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
    }

    //agregar la relacion con carrito_pridctos

    return Carrito;
}