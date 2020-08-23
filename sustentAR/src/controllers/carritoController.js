const fs = require('fs');
const path = require('path');   
const db = require('../database/models');
const { brotliDecompress } = require('zlib');

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
                    res.render('carritoDeCompras', {productos: productosARR, cantidad: carritoProductos});
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
        res.render('infoUsuarioCompra');
    },
    selecionarModoDePago : function(req, res){
        res.render('modoDePago');
    },
    finalizarCompra : function(req, res){
        res.render('finalizarCompra');
    },
    agregarACarrito : function(req, res){
        db.Usuario.findByPk(req.session.idUsuarioSession)
        .then(function(usuario){
            db.Carrito_productos.create({
                id_producto : req.body.idProductoAgregado,
                id_carrito : usuario.carrito_id,
                cantidad_productos : req.body.cantidad
            })
            .then(function(carritoProducto){
                db.Producto.findByPk(req.body.idProductoAgregado)
                .then(function(producto){
                    db.Producto.update({
                        stock: (producto.stock - req.body.cantidad)
                    },{
                        where: {
                            id: producto.id
                        }
                    })
                    res.redirect('/product/detail/' + req.body.idProductoAgregado)
                    //modificar stock
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
    borrarProductoDeCarrito: function(req, res){
        db.Usuario.findByPk(req.session.idUsuarioSession)
        .then(function(usuario){

            db.Carrito_productos.destroy({
                where: {
                    id_carrito: usuario.carrito_id,
                    id_producto: req.params.idProducto
                }
            })
            .then(function(){
                res.redirect('/carrito')
            })
            .catch(function(error){
                res.send(error)
            })
        })
        .catch(function(error){
            res.send(error)
        })
    }

}
