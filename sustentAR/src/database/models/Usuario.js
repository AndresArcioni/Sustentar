module.exports = (sequelize, dataTypes) => {
    let alias = 'Usuario';
    let cols = {
        id: {
            type: dataTypes.INTEGER(11),
            primaryKey: true,
            autoIncrement: true
        },
        nombre: {
            type: dataTypes.STRING(225),
        },
        apellido: {
            type: dataTypes.STRING(225),
        },
        email: {
            type: dataTypes.STRING(225),
        },
        contrasenia: {
            type: dataTypes.STRING(225),
        },
        dni: {
            type: dataTypes.INTEGER(11)
        },
        domicilio: {
            type: dataTypes.STRING(100)
        },
        codigo_postal: {
            type: dataTypes.INTEGER(11)
        },
        entre_calles: {
            type: dataTypes.STRING(225)
        },
        departamento: {
            type: dataTypes.STRING(45)
        },
        ciudad: {
            type: dataTypes.STRING(45)
        },
        telefono: {
            ype: dataTypes.INTEGER(11)
        },
        imagen_usuario_id:{
            type: dataTypes.INTEGER(11)
        },
        carrito_id: {
            type: dataTypes.INTEGER(11)
        },
        historial_de_compras_id: {
            type: dataTypes.INTEGER(11)
        }
    };
    let config = {
        tableName: 'usuarios',
        timestamps: true,
        underscored: true
    };
    const Usuario = sequelize.define(alias, cols, config);

    Usuario.associate = function(models) {
        Usuario.belongsTo(models.Carrito, {
            as: 'carrito',
            foreignKey: 'carrito_id'
        })
    };

    Usuario.associate = function(models) {
        Usuario.belongsTo(models.HistorialCompra, {
            as: 'historialCompras',
            foreignKey: 'historial_de_compras_id'
        })
    };

    Usuario.associate = function(models) {
        Usuario.belongsTo(models.ImagenUsuario, {
            as: 'imagenUsuario',
            foreignKey: 'imagen_usuario_id'
        })
    };


    return Usuario;
}