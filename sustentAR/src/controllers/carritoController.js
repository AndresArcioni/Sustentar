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
                db.Producto.findAll()//AGREGARLE LOS INCLUDES
                .then(function(listadoDeProductos){
                    return listadoDeProductos
                })
                .then(function(productos){
                    let productosEnCarrito = [];
                    /*
                    if(typeof productos == 'object'){
                        for(let i = 0; i < carritoProductos.length; i++){
                            if(carritoProductos[i].id_producto == productos.id){
                                productosEnCarrito.push(productos);
                            }
                        }
                    }else{
                        return res.send('aca');
                        for(let i = 0; i < carritoProductos.length; i++){
                            for(let j = 0; j < productos.length; j++){
                                if(carritoProductos[i].id_producto == productos[j].id){
                                    productosEnCarrito = productos[j];
                                }
                            }
                        }
                    }*/
                    for(let i = 0; i < carritoProductos.length; i++){
                        for(let j = 0; j < productos.length; j++){
                            if(carritoProductos[i].id_producto == productos[j].id){
                                productosEnCarrito = productos[j];
                            }
                        }
                    }

                    res.render('carritoDeCompras', {productos: productosEnCarrito, cantidad: carritoProductos.cantidad_productos});
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
                id_producto : req.body.idProducto,
                id_carrito : usuario.carrito_id,
                cantidad_productos : req.body.cantidad
            })
            .then(function(carritoProducto){
                db.Producto.findByPk(req.body.idProducto)
                .then(function(producto){
                    res.redirect('/carrito')
                    //modificar stock
                    /*
                    db.Producto.update(producto, {
                        where: {
                            id: req.body.idProducto
                        }
                    })
                    .then(function(result){
                        res.redirect('/carrito')
                    })*/
                })
                .catch(function(e) {
                    res.send(e)
                })
            })
            .catch(function(e) {
                res.send(e)
            })
        })
        
        
        
    }

}
