//  <<--MAINCONTROLLER-->>   //
module.exports = {
    root: function(req, res) {
        res.render('home')
    },
    mostrarCarrito : function(req, res){
        res.render('carritoDeCompras');
    },
    busquedaAvanzada: function(req, res){
        res.render('busquedaDeProductos');
    },
    formularioProductos: function(req, res){
        res.render('formularioProductos')
    },
    cuenta: function(req, res){
        res.render('cuenta')
    }
};

