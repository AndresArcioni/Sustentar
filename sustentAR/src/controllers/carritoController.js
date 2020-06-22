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
    }

}