module.exports = (sequelize, DataTypes) => {
    let alias = 'Productos_sustentabilidad'
    let cols = {
        id_producto: {
          type: Sequelize.DataTypes.INTEGER(10).UNSIGNED,
          allowNull : false
        },
        id_sustentabilidad: {
          type: Sequelize.DataTypes.INTEGER(10).UNSIGNED,
          allowNull : false
        }
    }
    let config = {
        tablename: 'productos_sustentabilidad',
        timestamps: false,
        underscores: true
    }
    
    const Productos_sustentabilidad = sequelize.define(alias, cols, config);

    /*Productos_sustentabilidad.associate = function(models){
        Productos_sustentabilidad.belongsToMany(models.Sustentabilidad, {
            as: 'sustentabilidad',
            through: 'productos_sustentabilidad',
            foreignKey: 'id_sustentabilidad',
            otherKey: 'id'
        })
        
        Productos_sustentabilidad.belongsToMany(models.Producto, {
            as: 'productos',
            through: 'productos_sustentabilidad',
            foreignKey: 'id_producto',
            otherKey: 'id'
        })
    }*/

    return Productos_sustentabilidad
}