const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');  
const {check, validationResult, body} = require('express-validator');
let usuarios = fs.readFileSync(path.join(__dirname, '../data/usuarios.json'), 'utf8');
usuarios = JSON.parse(usuarios);


module.exports = [
    check('nombre')
        .not()
        .isEmpty()
        .withMessage('Ingresar un nombre'),
    check('apellido')
        .not()
        .isEmpty()
        .withMessage('Ingresar un apellido'),
    check('email')
        .isEmail()
        .withMessage('Ingresar un email válido'),
    check('contrasenia')
        .isLength({min: 8})
        .withMessage('La contrasenia deberia tener un minimo de 8 caracteres'),
    body('email')
        .custom(function(emailIngresado){
            for(let i = 0 ; i < usuarios.length ; i++) {
                if(usuarios[i].email == emailIngresado) {
                    return false
                }
            }
            return true;
        }).withMessage('Este email ya esta registrado')
]