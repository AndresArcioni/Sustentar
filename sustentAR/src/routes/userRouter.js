const express = require('express');
const router = express.Router();
const path = require('path');
const userController = require(path.join(__dirname, '../controllers/userController.js'));

router.get('/cuenta', userController.cuenta);
router.post('/cuenta', userController.editarCuenta); //ES PUT EN REALIDAD
router.get('/login', userController.login);
router.get('/registro', userController.registro);
router.get('/misCompras', userController.misCompras);

module.exports = router;