module.exports = (sequelize, DataTypes) => {
    let alias = 'Categoria'
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
        tablename:'categorias',
        timestamps: false,
        freezeTableName: true
    }
    const Categoria = sequelize.define(alias, cols, config)
    
    Categoria.associate = function(models){
        Categoria.hasMany(models.Producto, {
            as: 'productos',
            foreignKey: 'id_categoria'
        })
    }

    return Categoria;
}