//  <<--REQUIRES OF ROUTES-->>   //
const express = require('express');
const router = express.Router();
const path = require('path');
const mainController = require(path.join(__dirname, '../controllers/mainController.js'));

//  <<--RUTAS-->>   //
router.get('/', mainController.root); /* GET - home page */
/*CARRITO*/
router.get('/carrito', mainController.mostrarCarrito);
router.get('/infoUsuarioCompra', mainController.mostrarCarrito);
router.get('/modoDePago', mainController.mostrarCarrito);
router.get('/finalizarCompra', mainController.mostrarCarrito);
/*FIN CARRITO*/
router.get('/busquedaAvanzada', mainController.busquedaAvanzada);
router.get('/formularioProductos', mainController.formularioProductos)
router.get('/cuenta', mainController.cuenta)


module.exports = router;