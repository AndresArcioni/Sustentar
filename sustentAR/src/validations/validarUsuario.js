const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');  
const {check, validationResult, body} = require('express-validator');
const db = require('../database/models');

module.exports = [

    body('email')
    .custom(async function(emailIngresado){

        let emailValido = await db.Usuario.findOne({
            where: {
                email: emailIngresado
            }
        })
        .then(function(resultado){
            if(resultado){
                return true;
            }else{
                throw Error('Este mail no está registrado');
            }
        })
        return emailValido;
        
    }).withMessage('Este mail no está registrado'),
    body('contrasenia')
    .custom(async function(contraseniaIngresada){

        let contraseniaValida = await db.Usuario.findAll()
        .then(function(resultado){
            for(let i = 0; i < resultado.length; i++){
                if(bcrypt.compareSync(contraseniaIngresada, resultado[i].dataValues.contrasenia)){
                    return true;
                }
            }
            throw Error('La contraseña ingresada es incorrecta. Debe contener entre 8 y 16 caracteres');
        })
        return contraseniaValida;
    }).withMessage('La contraseña ingresada no corresponde al usuario')
    
]



/*const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');  
const {check, validationResult, body} = require('express-validator');
const db = require('../database/models');

module.exports = [

    check('email')
    .isEmail().withMessage('Ingresa un mail válido'),
    
    check('contrasenia')
    .isLength({min: 8, max: 16}).withMessage('El password debe poseer entre 8 y 16 caracteres'),
  
    body('email')
    .custom(async function(emailIngresado){

        let emailValido = await db.Usuario.findOne({
            where: {
                email: emailIngresado
            }
        })
        .then(function(resultado){
            if(resultado){
                return true;
            }else{
                throw Error('Este mail no está registrado');
            }
        })
        return emailValido;
        
    }).withMessage('Este mail no está registrado'),
    body('contrasenia')
    .custom(async function(contraseniaIngresada){

        let contraseniaValida = await db.Usuario.findAll()
        .then(function(resultado){
            for(let i = 0; i < resultado.length; i++){
                if(bcrypt.compareSync(contraseniaIngresada, resultado[i].dataValues.contrasenia)){
                    return true;
                }
            }
            throw Error('La contraseña ingresada no corresponde al usuario');
        })
        return contraseniaValida;
    }).withMessage('La contraseña ingresada no corresponde al usuario')
    
]*/



/*
const fs = require('fs');
const path = require('path'); 
const db = require('../database/models');

async function validarUsuario(req, res){
    /*
    if(req.cookies.idUsuario != undefined){
        db.Usuario.findByPk(req.cookies.idUsuario)
        .then(function(usuario){
            return usuario
        })
    }
    if(req.session.idUsuarioSession != undefined){
        
        db.Usuario.findByPk(req.session.idUsuarioSession)
        .then(function(usuario){
            return usuario
        })
    }*/
    /*if(req.cookies.idUsuario != undefined){
        return req.cookies.idUsuario;
    }else{
        if(req.session.idUsuarioSession != undefined){
            return req.session.idUsuarioSession;
        }
    }
    return false;
    */
   
/*
    db.Usuario.findByPk()*/

    /*
    db.Usuario.findAll()
    .then(function(usuarios){
        for(let i = 0; i < usuarios.length; i++){
            if(req.cookies.idUsuario == undefined){
                if(usuarios[i].id == req.session.idUsuarioSession){
                    return usuarios[i];
                }
            }else{
                if(usuarios[i].id == req.cookies.idUsuario){
                    return usuarios[i];
                }
            }
        }
        return null;
    })
}


module.exports = validarUsuario;*/