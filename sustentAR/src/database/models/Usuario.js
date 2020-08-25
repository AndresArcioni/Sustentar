module.exports = (sequelize, DataTypes) => {
    let alias = 'Usuario';
    let cols = {
        id: {
            type: DataTypes.INTEGER(11),
            primaryKey: true,
            autoIncrement: true,
            unique: true
        },
        rol:{
            type: DataTypes.INTEGER(10).UNSIGNED,
            allowNull: false
        },
        nombre: {
            type: DataTypes.STRING(225),
            allowNull:false
        },
        apellido: {
            type: DataTypes.STRING(225),
            allowNull:false
        },
        email: {
            type: DataTypes.STRING(225),
            allowNull:false,
            unique: true
        },
        contrasenia: {
            type: DataTypes.STRING(225),
            allowNull: false
        },
        dni: {
            type: DataTypes.INTEGER(11),
            allowNull: true
        },
        domicilio: {
            type: DataTypes.STRING(100)
        },
        codigo_postal: {
            type: DataTypes.INTEGER(11)
        },
        entre_calles: {
            type: DataTypes.STRING(225)
        },
        departamento: {
            type: DataTypes.STRING(45)
        },
        ciudad: {
            type: DataTypes.STRING(45)
        },
        telefono: {
            type: DataTypes.INTEGER(11)
        },
        imagen_usuario:{
            type: DataTypes.STRING(225)
        },
        carrito_id: {
            type: DataTypes.INTEGER(10).UNSIGNED,
            allowNull: false
        },
        created_at: DataTypes.DATE,
        updated_at: DataTypes.DATE
    };
    let config = {
        tableName: 'usuarios',
        timestamps: true,
        underscored: true
    };
    const Usuario = sequelize.define(alias, cols, config);

    Usuario.associate = function(models) {
        Usuario.hasMany(models.Carrito, {
            as: 'carrito',
            foreignKey: 'carrito_id'
        })

        Usuario.hasMany(models.Historial_compra, {
            as: 'historial_compras',
            foreignKey: 'usuario_id'
        })
    };

    return Usuario;
}