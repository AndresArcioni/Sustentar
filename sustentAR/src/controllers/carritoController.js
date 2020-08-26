const fs = require('fs');
const path = require('path');   
const db = require('../database/models');

module.exports = {
    mostrarCarrito : function(req, res){
        db.Usuario.findByPk(req.session.idUsuarioSession)
        .then(function(usuario){

            db.Carrito_productos.findAll({
                where: {
                    id_carrito: usuario.carrito_id
                }
            })
            .then(function(carritoProductos){
                db.Producto.findAll({
                    include: [
                        {association: 'imagenes'},
                        {
                            model: db.Color,
                            as: 'colores',
                            through: {
                              model: db.Producto_color
                            }
                        }
                    ]
                })
                .then(function(listadoDeProductos){
                    return listadoDeProductos
                })
                .then(function(productos){
                    let productosARR = [];
                    for(let i = 0; i < carritoProductos.length; i++){
                        for(let j = 0; j < productos.length; j++){
                            if(carritoProductos[i].id_producto == productos[j].id){
                                productosARR.push(productos[j]);
                            }
                        }
                        
                    }
                    db.Color.findAll()
                    .then(function(colores){
                        res.render('carritoDeCompras', {productos: productosARR, cantidad: carritoProductos, colores});
                    })
                })
                .catch(function(){
                    res.redirect('/error');
                })
            })
            .catch(function(){
                res.redirect('/error');
            })
        })
        .catch(function(){
            res.redirect('/error');
        })
    },
    editarInfoUsuario : function(req, res){
        db.Usuario.findByPk(req.session.idUsuarioSession)
        .then(function(usuario){
            res.render('infoUsuarioCompra', {usuario});
        })
        .catch(function(){
            res.redirect('/error');
        })
    },
    selecionarModoDePago : function(req, res){
        res.render('modoDePago');
    },
    modoDePagoConfirmado: function(res,res) {
        res.redirect('/carrito/finalizarCompra');
    },
    finalizarCompra: function(req, res){
        db.Usuario.findByPk(req.session.idUsuarioSession)
            .then(function(usuario){

        db.Carrito_productos.findAll({
            where: {
            id_carrito: usuario.carrito_id
            }
        })
        .then(function(carritoProductos){
            db.Producto.findAll({
                include: [
                    {association: 'imagenes'},
                    {
                        model: db.Color,
                        as: 'colores',
                        through: {
                        model: db.Producto_color
                        }
                    }
                ]
            })
            .then(function(listadoDeProductos){
                return listadoDeProductos
            })
            .then(function(productos){
                let productosARR = [];
                for(let i = 0; i < carritoProductos.length; i++){
                    for(let j = 0; j < productos.length; j++){
                        if(carritoProductos[i].id_producto == productos[j].id){
                            productosARR.push(productos[j]);
                        }
                    }

                }
                db.Color.findAll()
                .then(function(colores){
                    res.render('finalizarCompra', {productos: productosARR, cantidad: carritoProductos, colores});
                    })
                })
                .catch(function(){
                    res.redirect('/error');
                })
            })
            .catch(function(){
                res.redirect('/error');
            })
        })
        .catch(function(){
            res.redirect('/error');
        })
    },
    agregarACarrito : function(req, res){
        db.Usuario.findByPk(req.session.idUsuarioSession)
        .then(function(usuario){
            db.Producto.findByPk(req.body.idProductoAgregado)
            .then(function(producto){
                if(producto.stock > 0){
                    db.Carrito_productos.create({
                        id_producto : req.body.idProductoAgregado,
                        id_carrito : usuario.carrito_id,
                        cantidad_productos : req.body.cantidad,
                        id_colores: req.body.color
                    })
                    .then(function(carritoProducto){
                        res.redirect('/carrito')
                    })
                    .catch(function(e) {
                        res.send(e)
                    })
                } else {
                    res.redirect('/error')
                }
            })
            
        })  
    },
    borrarProductoDeCarrito: async function(req, res){
        await db.Usuario.findByPk(req.session.idUsuarioSession)
        .then(async function(usuario){

            db.Carrito_productos.destroy({
                where: {
                    id_producto: req.params.idProducto
                }
            })   

        })
        .then(function(){
            res.redirect('/carrito')
        })
        .catch(function(error){
            res.redirect('/error');
        })
    },
    limpiarCarrito: function(req, res){
        db.Usuario.findByPk(req.session.idUsuarioSession)
        .then(async function(usuario){
            let historialDeCompra = await db.Historial_compra.findAll({
                where: {
                    usuario_id: usuario.id
                }
            })
            let carritos = await db.Carrito_productos.findAll({
                where: {
                    id_carrito: usuario.carrito_id
                }
            })
            let historialProductoBase = {
                id_producto: null,
                cantidad_productos:null,
                id_historial_compras: null
            }
            let historialProductoArr = [];

            for(let i = 0; i < carritos.length; i++){
                historialProductoBase.id_producto = carritos[i].id_producto;
                historialProductoBase.cantidad_productos = carritos[i].cantidad_productos;
                historialProductoBase.id_historial_compras = historialDeCompra[i].id;
                historialProductoArr.push(historialProductoBase)
                console.log(historialProductoBase);
            }
            let historial_producto = await db.Historial_producto.bulkCreate(historialProductoArr)

            let productos = await db.Producto.findAll()

            let productosFiltrados = []; 
            for(let i = 0; i < productos.length; i++){
                for(let j = 0; j < carritos.length; j++){
                    if(productos[i].id == carritos[j].id_producto){
                        productos[i].stock -= carritos[j].cantidad_productos;
                        productosFiltrados.push(productos[i]);
                        
                        let prod = await db.Producto.update({
                            stock: productos[i].stock 
                        }, {
                            where: {
                                id: productos[i].id
                            }
                        })
                    }
                }
            }

            for(let i = 0; i < productosFiltrados.length; i++){
                await db.Carrito_productos.destroy({
                    where: {
                        id_producto: productosFiltrados[i].id
                    }
                })
            }   

        })
        .then(function(){
            res.redirect('/')
        })
        .catch(function(error){
            res.redirect('/error');
        })
    }

}
