module.exports = (sequelize, DataTypes) => {
    let alias = 'Productos_sustentabilidad'
    let cols = {
        id:{
            type: DataTypes.INTEGER(10).UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            unique: true
        },
        id_producto: {
          type: DataTypes.INTEGER(10).UNSIGNED,
          allowNull : false
        },
        id_sustentabilidad: {
          type: DataTypes.INTEGER(10).UNSIGNED,
          allowNull : false
        }
    }
    let config = {
        tablename: 'productos_sustentabilidad',
        timestamps: false,
        underscored: true,
        freezeTableName: true
    }
    
    const Productos_sustentabilidad = sequelize.define(alias, cols, config);

    return Productos_sustentabilidad
}