const express = require('express');
const router = express.Router();
const path = require('path');
const carritoController = require(path.join(__dirname, '../controllers/carritoController.js'));
const accesoMiddleware = require('../middlewares/accesoMiddleware')


router.get('/', accesoMiddleware, carritoController.mostrarCarrito);
router.post('/', accesoMiddleware, carritoController.agregarACarrito);
router.delete('/:idProducto', accesoMiddleware, carritoController.borrarProductoDeCarrito)
router.get('/compraRealizada', carritoController.limpiarCarrito);
router.get('/infoUsuarioCompra', carritoController.editarInfoUsuario);
router.get('/modoDePago', carritoController.selecionarModoDePago);
router.post('/modoDePago', carritoController.compraOk);
router.get('/finalizarCompra', carritoController.finalizarCompra);

module.exports = router;