const fs = require('fs');
const path = require('path');   



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
