const {check, validationResult, body} = require('express-validator');

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
        .withMessage('Ingresar un email válido')
]