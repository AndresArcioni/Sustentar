const fs = require('fs');
const path = require('path');   

let productos = fs.readFileSync(path.join(__dirname, '../data/productos.json'), 'utf8');
productos = JSON.parse(productos);

module.exports = {
    mostrarCarrito : function(req, res){
        res.render('carritoDeCompras');
    },
    editarInfoUsuario : function(req, res){
        res.render('infoUsuarioCompra');
    },
    selecionarModoDePago : function(req, res){
        res.render('modoDePago');
    },
    finalizarCompra : function(req, res){
        res.render('finalizarCompra');
    },
    comprarProducto : function(req, res){
        let producto = req.body;
        res.send(req.body);
    }

}