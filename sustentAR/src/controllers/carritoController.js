const fs = require('fs');
const path = require('path');   
const db = require('../database/models');



module.exports = {
    mostrarCarrito : function(req, res){
        
        db.Usuario.findByPk(req.session.idUsuarioSession)
        .then(function(usuario){
            //return res.send(usuario)
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
                    for(let i = 0; i < carritoProductos.length; i++){
                        for(let j = 0; j < productos.length; j++){
                            if(carritoProductos[i].id_producto == productos[j].id){
                                productosEnCarrito.push(productos[j]);
                            }
                        }
                    }
                    res.render('carritoDeCompras', {usuario : req.session.idUsuario, productos: productosEnCarrito, cantidad: carritoProductos.cantidad_productos});
                })
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
    agregarACarrito : async function(req, res){
        
        let usuario;

        if(req.session.idUsuario != undefined){
            usuario = await db.Usuario.findByPk(req.session.idUsuario)
        }else{
            if(req.cookies.idUsuario != undefined){
                usuario = await db.Usuario.findByPk(req.cookies.idUsuario)
            }else{
                res.redirect('/user/login')
            }
        }

        if(usuario != undefined){
            db.Carrito_productos.create({
                id_producto : req.body.idProducto,
                id_carrito : usuario.carrito_id,
                cantidad_productos : req.body.cantidad
            })
            .then(function(carritoProducto){
                db.Producto.findByPk(Number(req.body.idProducto))
                .then(function(producto){
                    console.log(producto.id);
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
            })
            .catch(function(e) {
                res.send(e)
            })
        }
        
        
    }

}
