const fs = require('fs');
const path = require('path');
const validarUsuario = require('../validations/validarUsuario.js');
const db = require('../database/models');


//Traemos los productos de la DB
async function obtenerProductos(){
    db.Producto.findAll()
    .then(function(listadoDeProductos){
        return listadoDeProductos.json()
    })
}


    //  <<--PRODUCTSCONTROLLER-->>   //
module.exports = {
    listarProductos: async function(req, res){//Falta traer caetogiras p/poder filtrar

        db.Producto.findAll({
            include: [{association: 'imagenes'}]
        })
        .then(function(listadoDeProductos){
            return listadoDeProductos
        })
        .then(function(productos){
            if(req.session.idUsuario != undefined){
                res.redirect('listadoDeProductos', {productos: productos, usuario : req.session.idUsuario});
            }else{
                res.render('listadoDeProductos', {productos: productos});
            }
        })
        .catch(function(error) {
            res.send(error)
        })
        
    },
    formularioProductos: function(req, res){
        res.render('formularioProductos')
    },
    detail: function(req, res) {


        db.Producto.findByPk(req.params.idProducto, {
            include: [{association: 'imagenes'}]
        })
        .then(function(producto){
            db.Producto.findAll({
                include: [{association: 'imagenes'}]
            })
            .then(function(productos){
                if(req.session.idUsuario != undefined){
                    res.render('detalleDelProducto', {producto : producto,  usuario : req.session.idUsuario, productos: productos})
                }else{
                    res.render('detalleDelProducto', {producto : producto, productos: productos})
                }
            })
            
        })
        
    },
    agregarACarrito : function(req, res){
        let data = req.body;
        //ACA TIENE QUE SUMAR AL CARRITO DEL USUARIO
        res.send(req.body);
    },
    editarProducto : function(req, res){


        db.Producto.findByPk(req.params.idProducto,{
            include: [{association: 'imagenes'}, {association: 'colores'}/*,{model: 'Color'}/*, {association: 'sustentabilidad'}*/]
        })
        .then(function(producto) {
            return res.send(producto)
            if(req.session.idUsuario != undefined){
                res.render('editarProducto', {producto: producto, usuario : req.session.idUsuario})
            }else{
                res.render('editarProducto', {producto: producto})
            }            
        })
        .catch(function(error){
            res.send(error)
        })

        /*let producto;
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
        }*/
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
                    imagen1: (!req.files[0]) ? productos[i].imagen1 : req.files[0].filename,
                    imagen2: (!req.files[1]) ? productos[i].imagen2: req.files[1].filename,
                    imagen3: (!req.files[2]) ? productos[i].imagen3 : req.files[2].filename,
                }
                productos[i] = productoActualizado;
            }
        }
    },
    crearProducto: function(req, res){
        //return res.send(req.body)
        db.Producto.create({
            nombre: req.body.nombre,
            precio: Number(req.body.precio),
            stock: req.body.stock,
            descuento: Number(req.body.descuento),
            descripcion: req.body.descripcion,
            id_categoria: req.body.categoria
        })
        .then(function(nuevoProducto){
            let imagenes = req.files.map(elemento => {
                return {
                    nombre: elemento.filename,
                    id_producto: nuevoProducto.id
                }
            })
            db.Imagen_producto.bulkCreate(imagenes);

            let colores = req.body.color.map(elemento => {
                return {
                    id_producto: nuevoProducto.id,
                    id_colores: elemento
                }
            })
            db.Productos_colores.bulkCreate(colores)

            let sustentabilidad = req.body.sustentabilidad.map(elemento => {
                return {
                    id_producto: nuevoProducto.id,
                    id_sustentabilidad: elemento
                }
            })
            db.Productos_sustentabilidad.bulkCreate(sustentabilidad);

        }).then(function(producto){
            res.send(producto)
            res.redirect('/product/listadoDeProductos/');
        })
        .catch(function(error){
            res.send(error)
        })
    },
    borrarProducto : function(req, res){
        console.log(req.params.idProducto);
        productos.forEach(elemento => {
            if(elemento.id == req.params.idProducto) {
                productos.splice(productos.indexOf(elemento), 1)
                fs.writeFileSync(path.join(__dirname, '../data/productos.json'), JSON.stringify(productos));
        
        }})
        //PARA BORRAR LA IMAGEN AL BORRAR EL PRODUCTO
        //fs.unlinkSync(path.join(ruta de la imagen, nombre de la imagen));
        res.redirect('/product/listadoDeProductos');
    }
}