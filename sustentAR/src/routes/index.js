//  <<--REQUIRES OF ROUTES-->>   //
const express = require('express');
const router = express.Router();
const path = require('path');
const mainController = require(path.join(__dirname, '../controllers/mainController.js'));

//  <<--RUTAS-->>   //
router.get('/', mainController.root); /* GET - home page */
router.get('/cuenta', mainController.cuenta)


module.exports = router;