const express = require('express');
const router = express.Router();
const path = require('path');
const userController = require(path.join(__dirname, '../controllers/userController.js'));


router.get('/cuenta/:idUsuario', userController.cuenta);
router.put('/cuenta/:idUsuario', userController.editarCuenta);
router.get('/login', userController.login);
router.post('/login', userController.ingresarCuenta);
router.get('/registro', userController.registro);
router.post('/registro', userController.registrarNuevoUsuario);
router.get('/misCompras', userController.misCompras);

module.exports = router;