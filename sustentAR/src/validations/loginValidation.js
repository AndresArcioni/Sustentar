const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');  
const {check, validationResult, body} = require('express-validator');
let usuarios = fs.readFileSync(path.join(__dirname, '../data/usuarios.json'), 'utf8');
usuarios = JSON.parse(usuarios);
const db = require('../database/models');

module.exports = [
    body('email')
    .custom(async function(emailIngresado){

        let emailValido = await db.Usuario.findOne({
            where: {
                email: emailIngresado
            }
        })
        .then(function (resultado) {
            if(!resultado){
              throw new Error({error:[{message:'Este mail no existe!'}]});  // But this isn't triggering a validation error.
            }
        });
        /*
        .then(function(resultado){
            if(resultado){
                return true;
            }else{
                return false;
            }
        })*/
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
            return false;
        })
        .then(function (resultado) {
            if(!resultado){
              throw new Error({error:[{message:'La contraseña ingresada no corresponde al usuario'}]});  // But this isn't triggering a validation error.
            }
        });
        /*
        .catch(function(e){
            return e
        })*/
        return contraseniaValida;
    }).withMessage('La contraseña ingresada no corresponde al usuario')
    
]