module.exports = (sequelize, DataTypes) => {
    let alias = 'Color'
    let cols = {
        id:{
            type: DataTypes.INTEGER(10).UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            unique: true
          },
        nombre:{
            type: DataTypes.STRING(225)
          }
    }
    let config = {
        tablename : 'colores',
        timestamps : false
    }

    const Colores = sequelize.define(alias, cols, config);

    Colores.associate = function(models){
        Colores.belongsToMany(models.Producto, {
            as:'productoColores',
            through:'producto_colores',
            foreignKey: 'id_producto',
            otherKey: 'id'
        })
    }
    

    return Colores;
    
}