const fs = require('fs');
const path = require('path');   

let productos = fs.readFileSync(path.join(__dirname, '../data/productos.json'), 'utf8');
productos = JSON.parse(productos);

    //  <<--PRODUCTSCONTROLLER-->>   //
module.exports = {
    listarProductos: function(req, res){
        //mandar productos como objeto para la vista asi se puede usar el EJS dinamico
        res.render('listadoDeProductos');
    },
    formularioProductos: function(req, res){
        res.render('formularioProductos')
    },
    detail: function(req, res) {
        let producto;
        for(let i = 0; i < productos.length; i++){
            if(productos[i].id == req.params.idProducto){
                producto = productos[i];
            }
        }
        res.render('detalleDelProducto', {producto : producto})
    },
    agregarACarrito : function(req, res){
        let data = req.body;
        res.send(req.body);
    },
    editarProducto : function(req, res){
        let producto;
        for(let i = 0; i < productos.length; i++){
            if(productos[i].id == req.params.idProducto){
                producto = productos[i];
            }
        }
        res.render('editarProducto', {producto : producto})
    },
    actualizarProducto : function(req, res){
        for (let i = 0; i < productos.length; i++){
            if(req.params.idProducto == productos[i].id){
                productos[i] = req.body;
            }
        }
        fs.writeFileSync(path.join(__dirname, '../data/productos.json'), JSON.stringify(productos));
        res.send('Actualizando producto');
    },
    crearProducto: function(req, res){
        let nuevoProducto = {
            id: Number(productos.length + 1),
            ...req.body
        }
        productos.push(nuevoProducto);
        fs.writeFileSync(path.join(__dirname, '../data/productos.json'), JSON.stringify(productos));
        res.render('listadoDeProductos');
    },
    borrarProducto : function(req, res){
        console.log(req.params.idProducto);
        productos.forEach(elemento => {
            if(elemento.id == req.params.idProducto) {
                productos.splice(productos.indexOf(elemento), 1)
                fs.writeFileSync(path.join(__dirname, '../data/productos.json'), JSON.stringify(productos));
        
        }})
        res.redirect('/product/listadoDeProductos');
    }
}