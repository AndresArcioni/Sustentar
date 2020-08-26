const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');  
const {check, validationResult, body} = require('express-validator');
const db = require('../database/models');

//PARA EVITAR QUE CHEQUEE DB DE UNA. MEJORAR COMO MOSTRAR LOS ERRORES.

module.exports = [
    check('email')
    .isEmail().withMessage('Ingresa un mail válido'),
    check('contrasenia')
    .isLength({min: 8, max: 16}).withMessage(' ')
]