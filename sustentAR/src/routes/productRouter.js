//  <<--REQUIRES OF ROUTES-->>   //
const express = require('express');
const router = express.Router();
const path = require('path');
const productsController = require(path.join(__dirname, '../controllers/productsController.js'));


router.get('/listadoDeProductos', productsController.listarProductos);
router.get('/formularioProductos', productsController.formularioProductos);
router.post('/formularioProductos', productsController.crearProducto);
router.get('/editarProducto/:idProducto', productsController.editarProducto);
router.put('/editarProducto/:idProducto', productsController.actualizarProducto);
router.get('/detail/:idProducto', productsController.detail);
router.post('/detail/:idProducto', productsController.agregarACarrito);
router.delete('/borrar/:idProducto', productsController.borrarProducto);

module.exports = router;