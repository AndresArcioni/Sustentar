//  <<--MAINCONTROLLER-->>   //
module.exports = {
    root: function(req, res) {
        res.render('home')
    },
    mostrarCarrito : function(req, res){
        res.render('carritoDeCompras');
    },
    formularioProductos: function(req, res){
        res.render('formularioDeCargaDeProducto')
    }
};

