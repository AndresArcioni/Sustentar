const fs = require('fs');
const path = require('path');   
const validarUsuario = require('../validations/validarUsuario.js');

let productos = fs.readFileSync(path.join(__dirname, '../data/productos.json'), 'utf8');
productos = JSON.parse(productos);


module.exports = {
    mostrarCarrito : function(req, res){

        let usuario = validarUsuario(req, res);

        res.render('carritoDeCompras', {usuario : usuario});
    },
    editarInfoUsuario : function(req, res){

        let usuario = validarUsuario(req, res);

        res.render('infoUsuarioCompra', {usuario : usuario});
    },
    selecionarModoDePago : function(req, res){

        let usuario = validarUsuario(req, res);

        res.render('modoDePago', {usuario : usuario});
    },
    finalizarCompra : function(req, res){

        let usuario = validarUsuario(req, res);

        res.render('finalizarCompra', {usuario : usuario});
    },
    comprarProducto : function(req, res){
        let producto = req.body;

        res.send(req.body);
    }

}
