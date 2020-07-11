const fs = require('fs');
const path = require('path');

let productos = fs.readFileSync(path.join(__dirname, '../data/productos.json'), 'utf8');
productos = JSON.parse(productos);

    //  <<--PRODUCTSCONTROLLER-->>   //
module.exports = {
    listarProductos: function(req, res){
        res.render('listadoDeProductos', {productos: productos});
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
        res.send(req.body);
        for (let i = 0; i < productos.length; i++){
            if(req.params.idProducto == productos[i].id){
                let productoActualizado = {
                    id: productos[i].id,
                    ...req.body
                }
                if(productoActualizado.imagen1 == ""){
                    productoActualizado.imagen1 = productos[i].imagen1;
                }
                if(productoActualizado.imagen2 == ""){
                    productoActualizado.imagen2 = productos[i].imagen2;
                }
                if(productoActualizado.imagen3 == ""){
                    productoActualizado.imagen3 = productos[i].imagen3;
                }
                productos[i] = productoActualizado;
            }
        }
        fs.writeFileSync(path.join(__dirname, '../data/productos.json'), JSON.stringify(productos));
        res.redirect('/product/listadoDeProductos');
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