const fs = require('fs');
const path = require('path');
const db = require('../database/models');
const validarUsuario = require('../validations/validarUsuario');
const { Op } = require("sequelize");
const {check, validationResult, body} = require('express-validator');

//Traemos los productos de la DB
async function obtenerProductos(){
    db.Producto.findAll()
    .then(function(listadoDeProductos){
        return listadoDeProductos.json()
    })
}


module.exports = {
    listarProductos: async function(req, res){
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
                            res.redirect('/error');
                        })          
                    res.render('listadoDeProductos', {productos: productos, categorias:categorias, user : usuario, usuario : req.session.idUsuarioSession});
                }else{
                    res.render('listadoDeProductos', {productos: productos, categorias:categorias});
                }
            })
        })
        .catch(function(error) {
            res.redirect('/error');
        })  
    },
    ordenar: async function(req, res){
        let productos = await db.Producto.findAll({
            include: [{association: 'imagenes'}],
            order: [
                ['precio', (req.query.ordenar == 'mayor')? 'DESC' : 'ASC']
            ]
        })

        let categorias = await db.Categoria.findAll();

        if(req.session.idUsuarioSession != undefined){
            let usuario = await db.Usuario.findByPk(req.session.idUsuarioSession);

            res.render('listadoDeProductos', {productos: productos, categorias:categorias, user : usuario, usuario : req.session.idUsuarioSession});
        }else{
            res.render('listadoDeProductos', {productos: productos, categorias:categorias});
        }

    },
    filtrar: async function(req, res){
        let productos = await db.Producto.findAll({
            where : {
                id_categoria : req.query.filtroDeCategoria
            },
            include: [{association: 'imagenes'}]
        })

        let categorias = await db.Categoria.findAll();

        if(req.session.idUsuarioSession != undefined){
            let usuario = await db.Usuario.findByPk(req.session.idUsuarioSession);

            res.render('listadoDeProductos', {productos: productos, categorias:categorias, user : usuario, usuario : req.session.idUsuarioSession});
        }else{
            res.render('listadoDeProductos', {productos: productos, categorias:categorias});
        }
    },
    busquedaAvanzada: async function(req, res){
        let productos = await db.Producto.findAll({
            where : {
                nombre : {
                    [Op.like]: '%' + req.query.busquedaAvanzada + '%'
                }
            },
            include: [{association: 'imagenes'}]
        });

        let categorias = await db.Categoria.findAll();

        if(req.session.idUsuarioSession != undefined){
            let usuario = await db.Usuario.findByPk(req.session.idUsuarioSession);

            res.render('listadoDeProductos', {productos: productos, categorias:categorias, user : usuario, usuario : req.session.idUsuarioSession});
        }else{
            res.render('listadoDeProductos', {productos: productos, categorias:categorias});
        }
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
            .then(async function(productos){
                if(req.session.idUsuarioSession != undefined){
                    let usuario = await db.Usuario.findByPk(req.session.idUsuarioSession)
                        .then(function(usuario) {
                            return usuario
                        })
                        .catch(function(error) {
                            res.redirect('/error');
                        })       
                    res.render('detalleDelProducto', {producto : producto,  usuario : req.session.idUsuarioSession, user : usuario ,productos: productos})
                }else{
                    res.render('detalleDelProducto', {producto : producto, productos: productos})
                }
            })
            
        })
        .catch(error => res.redirect('/error'));
        
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
            if(req.session.idUsuarioSession != undefined){
                res.render('editarProducto', {producto: producto, colores, sustentabilidad, categorias, usuario: req.session.idUsuarioSession})
            }else{
                res.render('login', {producto: producto, colores, sustentabilidad, categorias})
            }            
        })
        .catch(function(error){
            res.redirect('/error');
        })

    },
    actualizarProducto : async function(req, res){     
        let errores = validationResult(req);
        if(errores.isEmpty()){
            db.Producto.update({
                nombre: req.body.nombre,
                precio: req.body.precio,
                stock: req.body.stock,
                descuento: req.body.descuento,
                descripcion: req.body.descripcion,
                id_categoria: req.body.categoria
            },{
                where: {
                    id:req.params.idProducto
                }
            })
            .then(async function(productoActualizado){
    
                db.Producto_sustentabilidad.destroy({
                    where: {
                        id_producto: req.params.idProducto
                    }
                })
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
                
    
                let destroyProdColor = await db.Producto_color.destroy({
                    where: {
                        id_producto: req.params.idProducto
                    }
                })
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
    
                //cambiar imagenes
                let img = await db.Imagen_producto.findAll();
                
                /*
                db.Imagen_producto.findAll({
                    where: {
                        id_producto: req.params.idProducto
                    }
                })
                .then(function(imagenesDeProducto){
                    return res.send(imagenesDeProducto);
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
                })*/
    
                /*
                if(req.files != ''){
                    try {
                        db.Producto.findAll().then(response => res.send(response))
                        .catch(function(e){
                            return res.send(e);
                        })
                        return res.send(imagenes);
                    }catch(e) {
                        return res.send(e)
                    }
                    return res.send('salimos y no encontramos nada')
                    db.Imagen_producto.findAll({
                        where: {
                            id_producto: req.params.idProducto
                        }
                    })
                    .then(function(imagenesDeProducto){
                        //return res.send('imagenesDeProducto');
                        let checkFieldnames = [false, false, false];
    
                        req.files.forEach(function(imagen){
                            if(imagen.fieldname != ''){
                                switch(imagen.fieldname){
                                    case 'imagenPrincipal':
                                        checkFieldnames[0] = true;
                                        break;
                                    case 'imagenSecundaria': 
                                        checkFieldnames[1] = true;
                                        break;
                                    case 'imagenTercera': 
                                        checkFieldnames[2] = true;
                                        break;
                                    default: 
                                }
                            }
                        })
                        return res.send(checkFieldnames);
                    })
                    .catch(function(err){
                        res.redirect('/error');
                    })
                }*/
            })
            .then(function(){
                res.redirect('/product/listadoDeProductos');
            })
            .catch(function(err){
                res.redirect('/error');;
            })
        }else{
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
                if(req.session.idUsuarioSession != undefined){
                    res.render('editarProducto', {colores, categorias, sustentabilidad, producto, errores: errores.errors, usuario : req.session.idUsuarioSession});
                }else{
                    res.redirect('/user/login')
                }            
            })
            .catch(function(error){
                res.redirect('/error');
            })
/*
            if(req.files[0] == undefined){
                errores.errors.push({
                    param: 'imagen',
                    msg: 'Debes que ingresar al menos 1 imagen',
                    location: 'body'
                })
            }*/
            
        }
        
        
    },
    crearProducto: async function(req, res){
        let errores = validationResult(req);
        if(errores.isEmpty()){
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
                res.redirect('/error');
            })
        }else{
            //return res.send(errores)
            let colores = await db.Color.findAll();
            let sustentabilidad = await db.Sustentabilidad.findAll();
            let categorias = await db.Categoria.findAll({
                where: {
                    id: req.params.idProducto
                }
            });

            if(req.files[0] == undefined){
                errores.errors.push({
                    param: 'imagen',
                    msg: 'Debes que ingresar al menos 1 imagen',
                    location: 'body'
                })
            }
            if(req.session.idUsuarioSession != undefined){
                res.render('formularioProductos', {colores, categorias, sustentabilidad, errores: errores.errors, usuario : req.session.idUsuarioSession});
            }else{
                res.redirect('/user/login')
            }  
            
        }

        
    },
    borrarProducto : function(req, res){
        db.Producto_sustentabilidad.destroy({
            where: {
                id_producto: req.params.idProducto
            }
        })
        .then(function() {
            db.Imagen_producto.findAll({
                where: {
                    id_producto: req.params.idProducto
                }
            })
            .then(function(imagenes) {
                let imagePath;
                
                imagenes.forEach(async element => {
                    imagePath = ('public/images/productos/' + element.nombre);
                    await fs.unlink(imagePath, (err) => {
                        if (err) throw err;
                        console.log(`${imagePath + element.nombre} fue eliminado con éxito`);
                    });
                });
                db.Imagen_producto.destroy({
                    where: {
                        id_producto: req.params.idProducto
                    }
                })
                .then(function(result){
                    db.Producto_color.destroy({
                        where: {
                            id_producto: req.params.idProducto
                        }
                    })
                })
                .then(function(result){
                    db.Producto.destroy({
                        where: {
                            id: req.params.idProducto
                        }
                    })
                })
                .then(function() {
                    res.redirect('/product/listadoDeProductos');
                })
            })
        })
        .catch(function(err) {
            res.redirect('/error');
        })
    }
}