    //  <<--PRODUCTSCONTROLLER-->>   //
module.exports = {
    busqueda: function(req, res){
        res.render('busquedaDeProductos');
    },
    formularioProductos: function(req, res){
        res.render('formularioProductos')
    },
    detail: function(req, res) {
        res.render('detalleDelProducto')
    },
    agregarACarrito : function(req, res){
        res.send(req.body);
    }
}