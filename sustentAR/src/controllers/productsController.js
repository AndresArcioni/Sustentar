const fs = require('fs');
const path = require('path');   

let productos = fs.readFileSync(path.join(__dirname, '../data/productos.json'), 'utf8');
productos = JSON.parse(productos);

    //  <<--PRODUCTSCONTROLLER-->>   //
module.exports = {
    busqueda: function(req, res){
        //mandar productos como objeto para la vista asi se puede usar el EJS dinamico
        res.render('busquedaDeProductos');
    },
    formularioProductos: function(req, res){
        res.render('formularioProductos')
    },
    detail: function(req, res) {
        res.render('detalleDelProducto')
    },
    agregarACarrito : function(req, res){
        let data = req.body;
        res.send(req.body);
    },
    editarProducto : function(req, res){
        let data = req.params;
        res.send(data);
    },
    crearProducto: function(req, res){
        let nuevoProducto = {
            categoria: req.body.categoria,
            nombre: req.body.nombreProducto
        }
    }
}