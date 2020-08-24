const fs = require('fs');
const path = require('path');
const db = require('../database/models');
const validarUsuario = require('../validations/validarUsuario');
const { Op } = require("sequelize");

//Traemos los productos de la DB
async function obtenerProductos(){
    db.Producto.findAll()
    .then(function(listadoDeProductos){
        return listadoDeProductos.json()
    })
}

//[Op.substring]: 'hat',                   // LIKE '%hat%'
    //  <<--PRODUCTSCONTROLLER-->>   //
module.exports = {
    listarProductos: async function(req, res){//Falta traer caetogiras p/poder filtrar
        // if(req.query.busquedaAvanzada != undefined){
        //     db.Producto.findAll({
        //         include: [{association: 'imagenes'}, {association: 'categorias'}]
        //     }, {
        //         where : {
        //             nombre : {
        //                 [Op.like]: '%' + req.query.busquedaAvanzada + '%'
        //             }
        //         }
        //     })
        //     .then(function(productoBuscado){
        //         return res.send(productoBuscado)
        //     })
        //     .catch(function(e){
        //         res.send(e)
        //     })
        // } else {}
        //req.query.busquedaAvanzada
            db.Producto.findAll({
                include: [{association: 'imagenes'}, {association: 'categorias'}]
            })
            .then(function(listadoDeProductos){
                return listadoDeProductos
            })
            .then(function(productos){  
                db.Categoria.findAll()
                .then(async function(categorias) {
                if(req.session.idUsuarioSession != undefined){
                    let usuario = await db.Usuario.findByPk(req.session.idUsuarioSession)
                        .then(function(usuario) {
                            return usuario
                        })
                        .catch(function(error) {
                            res.send(error)
                        })          
                    res.render('listadoDeProductos', {productos: productos, categorias:categorias, usuario : usuario, usuarioLogueado : req.session.idUsuarioSession});
                }else{
                    res.render('listadoDeProductos', {productos: productos, categorias:categorias});
                }
            })
            })
            .catch(function(error) {
                res.send(error)
            })
    },
    formularioProductos: async function(req, res){
        let colores = await db.Color.findAll();
        let sustentabilidad = await db.Sustentabilidad.findAll();
        let categorias = await db.Categoria.findAll();
        res.render('formularioProductos', {colores, categorias, sustentabilidad});
    },
    detail: function(req, res) {
        db.Producto.findByPk(req.params.idProducto, {
            include: [
                {association: 'imagenes'},
                {
                    model: db.Color,
                    as: 'colores',
                    through: {
                      model: db.Producto_color
                    }
                },
                {
                    model: db.Sustentabilidad,
                    as: 'sustentabilidad',
                    through: {
                      model: db.Producto_sustentabilidad
                    }
                }
            ]
        })
        .then(function(producto){
            
            db.Producto.findAll({
                include: [{association: 'imagenes'}]
            })
            .then(function(productos){
                return res.send(producto);
                if(req.session.idUsuario != undefined){
                    res.render('detalleDelProducto', {producto : producto,  usuarioLogueado : req.session.idUsuarioSession, productos: productos})
                }else{
                    res.render('detalleDelProducto', {producto : producto, productos: productos})
                }
            })
            
        })
        .catch(error => res.send(error));
        
    },
    agregarACarrito : function(req, res){
        let data = req.body;
        //ACA TIENE QUE SUMAR AL CARRITO DEL USUARIO
        res.send(req.body);
    },
    editarProducto : async function(req, res){
        
        let colores = await db.Color.findAll();
        let sustentabilidad = await db.Sustentabilidad.findAll();
        let categorias = await db.Categoria.findAll();

        db.Producto.findByPk(req.params.idProducto,{
            include: [
                {association: 'imagenes'},
                {
                    model: db.Color,
                    as: 'colores',
                    through: {
                      model: db.Producto_color
                    }
                },
                {
                    model: db.Sustentabilidad,
                    as: 'sustentabilidad',
                    through: {
                      model: db.Producto_sustentabilidad
                    }
                }
            ]
        })
        .then(function(producto) {
            if(req.session.idUsuario != undefined){
                res.render('editarProducto', {producto: producto, usuario : req.session.idUsuario, colores, sustentabilidad, categorias})
            }else{
                res.render('editarProducto', {producto: producto, colores, sustentabilidad, categorias})
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

        db.Producto.update({
            nombre: req.body.nombreProducto,
            precio: req.body.precio,
            stock: req.body.stock,
            descuento: req.body.descuento,
            descripcion: req.body.descripcionProducto,
            id_categoria: req.body.categoria
        },{
            where: {
                id:req.params.idProducto
            }
        })
        .then(function(productoActualizado){
            //return res.send(productoActualizado);
            db.Producto_sustentabilidad.destroy({
                where: {
                    id_producto: req.params.idProducto
                }
            })
            .then(function(resultado){
                let arrSustConverter = [];
                if (req.body.sustentabilidad.length == 1){
                    arrSustConverter.push(req.body.sustentabilidad);
    
                    let sust = arrSustConverter.map(elemento => {
                        return {
                            id_producto: req.params.idProducto,
                            id_sustentabilidad: elemento
                        }
                    })
                    db.Producto_sustentabilidad.bulkCreate(sust); 
                }else{
                    let sust = req.body.sustentabilidad.map(elemento => {
                        return {
                            id_producto: req.params.idProducto,
                            id_sustentabilidad: elemento
                        }
                    })
                    db.Producto_sustentabilidad.bulkCreate(sust);
                }
            })
            .catch(function(sustErr){
                return res.send(sustErr);
            })

            db.Producto_color.destroy({
                where: {
                    id_producto: req.params.idProducto
                }
            })
            .then(function(resultado){
                let arrColorConverter = [];
                if (req.body.color.length == 1){
                    arrColorConverter.push(req.body.color);
    
                    let color = arrColorConverter.map(elemento => {
                        return {
                            id_producto: req.params.idProducto,
                            id_colores: elemento
                        }
                    })
                    db.Producto_color.bulkCreate(color); 
                }else{
                    let color = req.body.color.map(elemento => {
                        return {
                            id_producto: req.params.idProducto,
                            id_colores: elemento
                        }
                    })
                    db.Producto_color.bulkCreate(color);
                }
            })
            if(req.files != ''){
                db.Imagen_producto.findAll({
                    where: {
                        id_producto: req.params.idProducto
                    }
                })
                .then(function(imagenesDeProducto){
                    db.Imagen_producto.destroy({
                        where: {
                            id_producto: req.params.idProducto
                        }
                    })
                    .then(function(resultado) {
                        let imagenes = req.files.map(elemento => {
                            return {
                                nombre: elemento.filename,
                                id_producto: req.params.idProducto
                            }
                        })
                        db.Imagen_producto.bulkCreate(imagenes);
                    })
                    .catch(function(imgErr){
                        return res.send(imgErr);
                    })
                })
                
            }
            
            
        })
        .then(function(){
            res.redirect('/product/listadoDeProductos');
        })
        .catch(function(err){
            return res.send(err);
        })
    },
    crearProducto: function(req, res){
        db.Producto.create({
            nombre: req.body.nombre,
            precio: Number(req.body.precio),
            stock: req.body.stock,
            descuento: Number(req.body.descuento),
            descripcion: req.body.descripcion,
            id_categoria: Number(req.body.categoria)
        })
        .then(function(nuevoProducto){
            let imagenes = req.files.map(elemento => {
                return {
                    nombre: elemento.filename,
                    id_producto: nuevoProducto.id
                }
            })
            db.Imagen_producto.bulkCreate(imagenes);

            let arrSustConverter = [];
            if (req.body.sustentabilidad.length == 1){
                arrSustConverter.push(req.body.sustentabilidad);

                let sust = arrSustConverter.map(elemento => {
                    return {
                        id_producto: nuevoProducto.id,
                        id_sustentabilidad: elemento
                    }
                })
                db.Producto_sustentabilidad.bulkCreate(sust); 
            }else{
                let sust = req.body.sustentabilidad.map(elemento => {
                    return {
                        id_producto: nuevoProducto.id,
                        id_sustentabilidad: elemento
                    }
                })
                db.Producto_sustentabilidad.bulkCreate(sust);
            }
            let arrColorConverter = [];
            if (req.body.color.length == 1){
                arrColorConverter.push(req.body.color);

                let color = arrColorConverter.map(elemento => {
                    return {
                        id_producto: nuevoProducto.id,
                        id_colores: elemento
                    }
                })
                db.Producto_color.bulkCreate(color); 
            }else{
                let color = req.body.color.map(elemento => {
                    return {
                        id_producto: nuevoProducto.id,
                        id_colores: elemento
                    }
                })
                db.Producto_color.bulkCreate(color);
            }
        }).then(function(producto){
            res.redirect('/product/listadoDeProductos');
        })
        .catch(function(error){
            res.send(error)
        })
    },
    borrarProducto : function(req, res){
        // return res.send(req.body)
        db.Producto_sustentabilidad.destroy({
            where: {
                id_producto: req.params.idProducto
            }
        })
        .then(function() {
            db.Imagen_producto.destroy({
                where: {
                    id_producto: req.params.idProducto
                }
            })
        })
        .then(function(){
            db.Producto_color.destroy({
                where: {
                    id_producto: req.params.idProducto
                }
            })
        })
        .then(function(){
            db.Producto.destroy({
                where: {
                    id: req.params.idProducto
                }
            })
        })
        .then(function() {
            res.redirect('/product/listadoDeProductos');
        })
        .catch(function(err) {
            res.send(err)
        })
    }
}