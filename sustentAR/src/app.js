const express = require('express');
const app = express();
const path = require('path');

// ************ Middlewares ************ //
app.use(express.static(path.join(__dirname, '../public')));
app.use(express.urlencoded({extended: false}));
app.use(express.json());

// ************ Template Engine ************ //
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// ************ Route System require and use() ************ //
const mainRouter = require('./routes/index.js'); // Ruta HOME
const carritoRouter = require('./routes/carritoDeComprasRouter.js');// Ruta Carrito

app.use('/', mainRouter);
app.use('/carrito', carritoRouter);

// ************ Route System require and use() ************ //
app.listen(3000, () => console.log("Servidor corriendo en el puerto 3000"));