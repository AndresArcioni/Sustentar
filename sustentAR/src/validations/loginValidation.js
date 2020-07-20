const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');  
const {check, validationResult, body} = require('express-validator');
let usuarios = fs.readFileSync(path.join(__dirname, '../data/usuarios.json'), 'utf8');
usuarios = JSON.parse(usuarios);

module.exports = [
    body('email')
    .custom(function(emailIngresado){
        for(let i = 0 ; i < usuarios.length ; i++){
            if (usuarios[i].email == emailIngresado){
                return true;
            }
        }
        return false;
    }).withMessage('Este mail no existe'),
    body('contrasenia')
    .custom(function(contraseniaIngresada){
        for(let i = 0 ; i < usuarios.length ; i++){
            if (bcrypt.compareSync(contraseniaIngresada, usuarios[i].contrasenia)){
                return true;
            }
        }
        return false;
    }).withMessage('La contraseña ingresada no corresponde al usuario')
]