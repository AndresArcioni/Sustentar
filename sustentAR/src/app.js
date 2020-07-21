const express = require('express');
const app = express();
const path = require('path');
const methodOverride =  require('method-override'); // Para poder usar los métodos PUT y DELETE
const session = require('express-session');
const cookieParser = require('cookie-parser');
const accesoCookieMiddleware = require('./middlewares/accesoCookieMiddleware')

// ************ Middlewares ************ //
app.use(express.static(path.join(__dirname, '../public')));
app.use(cookieParser());
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(methodOverride('_method')); // Pasar poder pisar el method="POST" en el formulario por PUT y DELETE
app.use(session({secret:'holis'}));

app.use(accesoCookieMiddleware)


// ************ Template Engine ************ //
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// ************ Route System require and use() ************ //
const mainRouter = require('./routes/index.js'); // Ruta HOME
const carritoRouter = require('./routes/carritoDeComprasRouter.js');// Ruta Carrito
const productRouter = require('./routes/productRouter.js');// Ruta de productos
const userRouter = require('./routes/userRouter.js');
const accesoMiddleware = require('./middlewares/accesoMiddleware')

app.use('/', mainRouter);
app.use('/carrito', carritoRouter);
app.use('/product', productRouter);
app.use('/user', userRouter);

// ************ Route System require and use() ************ //
app.listen(3000, () => console.log("Servidor corriendo en el puerto 3000"));