const express = require('express');
const router = express.Router();
const path = require('path');
const carritoController = require(path.join(__dirname, '../controllers/carritoController.js'));

router.get('/', carritoController.mostrarCarrito);
router.post('/', carritoController.comprarProducto);
router.get('/infoUsuarioCompra', carritoController.editarInfoUsuario);
router.get('/modoDePago', carritoController.selecionarModoDePago);
router.get('/finalizarCompra', carritoController.finalizarCompra);

module.exports = router;