const {check, validationResult, body} = require('express-validator');

module.exports = [
    check('nombre')
        .not()
        .isEmpty()
        .withMessage('El producto debe tener un nombre'),
    check('precio')
        .not()
        .isEmpty()
        .withMessage('El producto debe tener un precio'),
    check('descripcion')
        .isLength({min: 8})
        .withMessage('La descripcion debe tener un minimo de 8 caracteres'),
    check('categoria')
        .not()
        .isEmpty()
        .withMessage('Debes elegir al menos una categoria'),
    check('stock')
        .not()
        .isEmpty()
        .withMessage('Ingrese un stock valido'),
    body('color')
        .custom(function(coloresSeleccionados){
            if(coloresSeleccionados == null){
                return false;
            }else{
                return true;
            }
        }).withMessage('Debe seleccionar al menos un color'),
    body('sustentabilidad')
        .custom(function(sustSeleccionados){
            if(sustSeleccionados == null){
                return false;
            }else{
                return true;
            }
        }).withMessage('Debes seleccionar al menos una sustentabilidad')    
]