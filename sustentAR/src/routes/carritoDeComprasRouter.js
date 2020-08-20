const express = require('express');
const router = express.Router();
const path = require('path');
const carritoController = require(path.join(__dirname, '../controllers/carritoController.js'));
const accesoMiddleware = require('../middlewares/accesoMiddleware')


router.get('/', accesoMiddleware, carritoController.mostrarCarrito);
router.post('/', carritoController.agregarACarrito);
router.get('/infoUsuarioCompra', carritoController.editarInfoUsuario);
router.get('/modoDePago', carritoController.selecionarModoDePago);
router.get('/finalizarCompra', carritoController.finalizarCompra);

module.exports = router;