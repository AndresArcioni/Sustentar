module.exports = (sequelize, DataTypes) => {
    let alias = 'Sustentabilidad'
    let cols = {
        id : {
        type: DataTypes.INTEGER(10).UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
        unique: true
        },
        nombre : {
            type: DataTypes.STRING(150)
        }
    }
    let config = {
        tablename:'sustentabilidad',
        timestamps: false
    }
    const Sustentabilidad = sequelize.define(alias, cols, config)

    //falta la relacion con la tabla producto_sustentabilidad

    return Sustentabilidad;
}