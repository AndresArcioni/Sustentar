module.exports = (sequelize, DataTypes) => {
    let alias = 'Productos_colores'
    let cols = {
        id_producto: {
          type: Sequelize.DataTypes.INTEGER(10).UNSIGNED,
          allowNull : false
        },
        id_colores: {
          type: Sequelize.DataTypes.INTEGER(10).UNSIGNED,
          allowNull: false
        }
    }
    let config = {
        tablename: 'productos_colores',
        timestamps: false,
        underscores: true
    }
    
    const Productos_Colores = sequelize.define(alias, cols, config);
    
    Productos_Colores.association = function(models){

        Productos_Colores.belongsToMany(models.Producto, {
            as: 'productos',
            through: 'Productos_Colores',
            foreignKey: 'id_producto',
            otherKey: 'id'
        })

        Productos_Colores.belongsToMany(models.Colores, {
            as: 'colores',
            through: 'Productos_Colores',
            foreignKey: 'id_colores',
            otherKey: 'id'
        })
    }

    return Productos_Colores;
}