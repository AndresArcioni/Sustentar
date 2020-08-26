const express = require('express');
const router = express.Router();
const path = require('path');
const carritoController = require(path.join(__dirname, '../controllers/carritoController.js'));
const accesoMiddleware = require('../middlewares/accesoMiddleware')


router.get('/', accesoMiddleware, carritoController.mostrarCarrito);
router.post('/', accesoMiddleware, carritoController.agregarACarrito);
router.delete('/:idProducto', accesoMiddleware, carritoController.borrarProductoDeCarrito)
router.get('/compraRealizada', accesoMiddleware,carritoController.limpiarCarrito);
router.get('/infoUsuarioCompra', accesoMiddleware,carritoController.editarInfoUsuario);
router.get('/modoDePago', accesoMiddleware,carritoController.selecionarModoDePago);
router.get('/finalizarCompra', accesoMiddleware,carritoController.finalizarCompra);

module.exports = router;