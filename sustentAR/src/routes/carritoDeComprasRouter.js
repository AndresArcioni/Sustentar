const express = require('express');
const router = express.Router();
const path = require('path');
const carritoController = require(path.join(__dirname, '../controllers/carritoController.js'));
const accesoMiddleware = require('../middlewares/accesoMiddleware')


router.get('/', accesoMiddleware, carritoController.mostrarCarrito);
router.post('/', accesoMiddleware, carritoController.agregarACarrito);
router.delete('/:idProducto', accesoMiddleware, carritoController.borrarProductoDeCarrito)
<<<<<<< HEAD
router.get('/compraRealizada', carritoController.limpiarCarrito);
router.get('/infoUsuarioCompra', carritoController.editarInfoUsuario);
router.get('/modoDePago', carritoController.selecionarModoDePago);
router.post('/modoDePago', carritoController.compraOk);
router.get('/finalizarCompra', carritoController.finalizarCompra);
=======
router.get('/compraRealizada', accesoMiddleware,carritoController.limpiarCarrito);
router.get('/infoUsuarioCompra', accesoMiddleware,carritoController.editarInfoUsuario);
router.get('/modoDePago', accesoMiddleware,carritoController.selecionarModoDePago);
router.get('/finalizarCompra', accesoMiddleware,carritoController.finalizarCompra);
>>>>>>> 98ab91e24ee24d6b1cb476e9d468889d384f5529

module.exports = router;