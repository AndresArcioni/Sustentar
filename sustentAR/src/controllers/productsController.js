const fs = require('fs');
const path = require('path');
const validarUsuario = require('../validations/validarUsuario.js');

let productos = fs.readFileSync(path.join(__dirname, '../data/productos.json'), 'utf8');
productos = JSON.parse(productos);

    //  <<--PRODUCTSCONTROLLER-->>   //
module.exports = {
    listarProductos: function(req, res){

        let usuario = validarUsuario(req, res);
        if(usuario){
            res.render('listadoDeProductos', {productos: productos, usuario : usuario});
        }else{
            res.render('listadoDeProductos', {productos: productos});
        }

        
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

        let usuario = validarUsuario(req, res);
        if(usuario){
            res.render('detalleDelProducto', {producto : producto, usuario : usuario})
        }else{
            res.render('detalleDelProducto', {producto : producto})
        }
        
        
    },
    agregarACarrito : function(req, res){
        let data = req.body;
        //ACA TIENE QUE SUMAR AL CARRITO DEL USUARIO
        res.send(req.body);
    },
    editarProducto : function(req, res){
        let producto;
        for(let i = 0; i < productos.length; i++){
            if(productos[i].id == req.params.idProducto){
                producto = productos[i];
            }
        }

        let usuario = validarUsuario(req, res);
        if(usuario){
            res.render('editarProducto', {producto: producto, usuario : usuario})
        }else{
            res.render('editarProducto', {producto: producto})
        }
    },
    actualizarProducto : function(req, res){
        
        for (let i = 0; i < productos.length; i++){
            if(req.params.idProducto == productos[i].id){
                let productoActualizado = {
                    id: productos[i].id,
                    nombreProducto: req.body.nombreProducto,
                    precio: req.body.precio,
                    stock: req.body.stock,
                    descuento: req.body.descuento,
                    descripcionProducto: req.body.descripcionProducto,
                    colores: req.body.colores,
                    sustentabilidad: req.body.sustentabilidad,
                    imagen1: (req.files[0].filename == undefined) ? productos[i].imagen1 : req.files[0].filename,
                    imagen2: (req.files[1].filename == undefined) ? productos[i].imagen2: req.files[1].filename,
                    imagen3: (req.files[2].filename == undefined) ? productos[i].imagen3 : req.files[2].filename,
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

        let usuario = validarUsuario(req, res);
        if(usuario){
            res.render('listadoDeProductos', {usuario : usuario})
        }else{
            res.render('listadoDeProductos')
        }
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