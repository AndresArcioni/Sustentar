const express = require('express');
const router = express.Router();
const multer = require('multer'); 
const path = require('path');
const userController = require(path.join(__dirname, '../controllers/userController.js'));
const loginValidation = require('../validations/loginValidation')
const registerValidation = require('../validations/registerValidation')


let storage = multer.diskStorage({
    destination:function(req, file, cb){
        cb(null, path.join(__dirname, '../../public/images/usuarios'));
    },
    filename: function(req, file, cb){
        cb(null, 'avatar' + '-' + Date.now() + path.extname(file.originalname));
    }
});

let upload = multer({storage:storage});

router.get('/cuenta/:idUsuario', userController.cuenta);
router.put('/cuenta/:idUsuario', upload.any(), userController.editarCuenta);
router.get('/login', userController.login);
router.post('/login', loginValidation, userController.ingresarCuenta);
router.get('/registro', userController.registro);
router.post('/registro', upload.any(), registerValidation, userController.registrarNuevoUsuario);
router.get('/misCompras/:idUsuario', userController.misCompras);
router.get('/logout', userController.logout);

module.exports = router;