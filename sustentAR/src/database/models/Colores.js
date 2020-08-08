module.exports = (sequelize, DataTypes) => {
    let alias = 'Colores'
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
    return Colores;
    
}