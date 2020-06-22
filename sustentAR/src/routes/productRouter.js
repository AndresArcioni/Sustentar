//  <<--REQUIRES OF ROUTES-->>   //
const express = require('express');
const router = express.Router();
const path = require('path');
const productsController = require(path.join(__dirname, '../controllers/productsController.js'));


router.get('/busquedaAvanzada', productsController.busquedaAvanzada);
router.get('/formularioProductos', productsController.formularioProductos);

module.exports = router;