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
        tableName : 'colores',
        timestamps : false,
        freezeTableName: true
    }

    const Color = sequelize.define(alias, cols, config);

    Color.associate = function(models){
        Color.belongsToMany(models.Producto, {
            as:'productos',
            through:'productos_colores',
            foreignKey: 'id_producto',
            otherKey: 'id'
        })
    }
    

    return Color;
    
}