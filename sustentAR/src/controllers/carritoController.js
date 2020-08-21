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
                })//AGREGARLE LOS INCLUDES
                .then(function(listadoDeProductos){
                    return listadoDeProductos
                })
                .then(function(productos){
                    /*let productosEnCarrito = [];
                    
                    for(let i = 0; i < carritoProductos.length; i++){
                        if(carritoProductos[i].id_producto == productos.id){
                            productosEnCarrito.push(productos);
                        }
                    }*/
                    //cantidad y productos se necesita un for porque cada uno es un array
                    return res.send(productos);
                    res.render('carritoDeCompras', {productos: productos, cantidad: carritoProductos});
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
                //AGREGAR EL COLOR A ESTE MODELO Y MIGRACION PARA PODER HACER QUE SE MUESTRE EN EL CARRITO
            })
            .then(function(carritoProducto){
                db.Producto.findByPk(req.body.idProductoAgregado)
                .then(function(producto){
                    res.redirect('/carrito')
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
        
        
        
    }

}
