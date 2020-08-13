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
                throw Error('Este mail no es válido');
            }
        })
        return emailValido;
        
    }).withMessage('Este mail no existe'),
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
    
]