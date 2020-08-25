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
                .catch(function(error){
                    res.send(error)
                })
            })
            .catch(function(error){
                res.send(error)
            })
        })
        .catch(function(error){
            res.send(error)
        })
    },
    editarInfoUsuario : function(req, res){
        db.Usuario.findByPk(req.session.idUsuarioSession)
        .then(function(usuario){
            res.render('infoUsuarioCompra', {usuario});
        })
        .catch(function(e){
            res.send(e)
        })
    },
    selecionarModoDePago : function(req, res){
        res.render('modoDePago');
    },
    finalizarCompra : function(req, res){
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
                    let totalCompra = 0;
                    for(let i = 0; i < carritoProductos.length; i++){
                        for(let j = 0; j < productos.length; j++){
                            if(carritoProductos[i].id_producto == productos[j].id){
                                productosARR.push(productos[j]);
                                totalCompra += Number(productos[j].precio * carritoProductos[i].cantidad_productos);
                            }
                        }
                    }
                    res.render('finalizarCompra', {productos: productosARR, cantidad: carritoProductos, precioFinal: totalCompra});
                })
                .catch(function(error){
                    res.send(error)
                })
            })
            .catch(function(error){
                res.send(error)
            })
        })
        .catch(function(error){
            res.send(error)
        })
        
    },
    agregarACarrito : function(req, res){
        db.Usuario.findByPk(req.session.idUsuarioSession)
        .then(function(usuario){
            db.Carrito_productos.create({
                id_producto : req.body.idProductoAgregado,
                id_carrito : usuario.carrito_id,
                cantidad_productos : req.body.cantidad,
                id_colores: req.body.color
            })
            .then(function(carritoProducto){
                db.Producto.findByPk(req.body.idProductoAgregado)
                .then(function(producto){
                    res.redirect('/product/detail/' + req.body.idProductoAgregado)
                })
                .catch(function(e) {
                    res.send(e)
                })
            })
            .catch(function(e) {
                res.send(e)
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
            res.send(error)
        })
    },
    limpiarCarrito: async function(req, res){
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
            .then(function(carrito){
                return carrito;
            })
            .catch(function(error){
                res.send(error)
            })

            let historialProductoBase = {
                id_producto: null,
                cantidad_productos:null,
                id_historial_compras: null,
            }
            let historialProductoArr = [];

            for(let i = 0; i < carritos.length; i++){
                historialProductoBase.id_producto = carritos[i].id_producto;
                historialProductoBase.cantidad_productos = carritos[i].cantidad_productos;
                historialProductoBase.id_historial_compras = historialDeCompra[i].id;
                historialProductoArr.push(historialProductoBase)
                console.log(historialProductoBase);
            }
            db.Historial_producto.bulkCreate(historialProductoArr)
            
            .then(function(historialProductos){
                return historialProductos
            })
            .catch(function(e){
                res.send(e)
            })

            let productos = await db.Producto.findAll()
            .then(function(productos){
                return productos;
            })

            let productosFiltrados = []; 
            for(let i = 0; i < productos.length; i++){
                for(let j = 0; j < carritos.length; j++){
                    if(productos[i].id == carritos[j].id_producto){
                        productos[i].stock -= carritos[j].cantidad_productos;
                        productosFiltrados.push(productos[i]);
                    }
                }
            }

            for(let i = 0; i < productosFiltrados.length; i++){
                db.Carrito_productos.destroy({
                    where: {
                        id_producto: productosFiltrados[i].id
                    }
                })
            }   
            
            db.Producto.update(productos)
            .then(function(productosActualizados){
                return productosActualizados;
            })
        })
        .then(function(){
            res.redirect('/')
        })
        .catch(function(error){
            res.send(error)
        })
    }

}
