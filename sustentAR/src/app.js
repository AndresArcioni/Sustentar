const express = require('express');
const app = express();
const path = require('path');


app.use(express.static(path.join(__dirname, '../public')));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.use('/', function(req, res){
    res.send('Funciona!');
});

app.listen(3000, () => console.log("Servidor corriendo en el puerto 3000"));