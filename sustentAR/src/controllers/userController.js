const fs = require('fs');
const path = require('path'); 
let bcrypt = require('bcryptjs');  
const validarUsuario = require('../validations/validarUsuario.js');
const {check, validationResult, body} = require('express-validator');
const db = require('../database/models');


//  <<--USERCONTROLLER-->>   //
module.exports = {
    cuenta: function(req, res){

        db.Usuario.findOne({
            where: {
                id: (req.cookies.idUsuario != undefined) ? req.cookies.idUsuario : req.session.idUsuarioSession
            }
        })
        .then(function(usuario){
            res.render('cuenta', {usuario : usuario})
        })
    },
    login: function(req, res){
        res.render('login')
    },
    ingresarCuenta: function(req, res, next){
        
        let errores = validationResult(req);

        if(errores.isEmpty()){
            db.Usuario.findAll()
            .then(function(usuarios) {
                for(let i = 0; i < usuarios.length; i++) {
                    if(usuarios[i].email == req.body.email && bcrypt.compareSync(req.body.contrasenia, usuarios[i].contrasenia)) {
                        req.session.idUsuarioSession = usuarios[i].id;
                        if(req.body.recordame != undefined) {
                            res.cookie('idUsuario', usuarios[i].id, {maxAge: 60000 * 60 * 24 * 7}) 
                        }
                        res.redirect('/')
                    }
                }
            })
        }else{
            res.render('login', {errores: errores})
        }
    
    },
    registro: function(req, res){
        res.render('registro')
    },
    registrarNuevoUsuario : function(req, res, next){
        
        let errores = validationResult(req);
        
        if(errores.isEmpty()){
            let nuevoUsuario = {
                nombre: req.body.nombre,
                apellido: req.body.apellido,
                contrasenia: bcrypt.hashSync(req.body.contrasenia, 10),
                email: req.body.email,
                imagen_usuario: (req.files[0] == undefined) ? 'Logo_de_PaginaWeb.png'  : req.files[0].filename, 
                dni: null,
                domicilio: " ",
                departamento: " ",
                codigo_postal: null,
                ciudad: " ",
                entre_calles: " ",
                telefono: null,
                rol: 1,
                created_at: new Date(),
                updated_at: new Date(),
                carrito_id: ''
            }
            
            db.Carrito.create({
                total: 0,
                cantidad_productos: 0
            })
            .then(function(result){
                
                nuevoUsuario.carrito_id = result.id;
                
                db.Usuario.create(nuevoUsuario)
                .then(function(usuarioCreado){
                    db.Historial_compra.create({
                        id_carrito: usuarioCreado.carrito_id,
                        usuario_id: usuarioCreado.id
                    })
                    .then(function() {
                        res.redirect('/user/login')
                    })
                    .catch(function(e) {
                      res.redirect('/error')
                    })
                })               
            })
            .catch(function(e){
                res.redirect('/error')
            })
        } else {
            res.render('registro', {errores : errores.errors});
        }
        
    },
    misCompras: async function(req, res){
        
        if(req.session.idUsuarioSession != undefined){
            try {
                let usuario = await db.Usuario.findByPk(req.session.idUsuarioSession);
                
                let historial = await db.Historial_compra.findAll({
                    where:{
                        usuario_id: usuario.id
                    }
                });
                
                let historiales = [];
                let historialProducto = await db.Historial_producto.findAll()
                
                historial.forEach(cadaHistorial => {
                    historialProducto.forEach(function(elemento){
                        if(elemento.id_historial_compras == cadaHistorial.id){
                            historiales.push(elemento)
                        }
                    })
                });

                let productosComprados = [];
                let productos = await db.Producto.findAll({
                    include: [{association: 'imagenes'}]
                });
                
                historiales.forEach(cadaHistorial => {
                    productos.forEach(function(producto){
                        if(producto.id == cadaHistorial.id_producto){
                            productosComprados.push(producto);
                        }
                    })
                });
                res.render('misCompras', {productosComprados: productosComprados, usuario : req.session.idUsuarioSession, historial : historial, cantidadDeProducto: historiales});

            }catch(e){
                res.redirect('/error')
            }
        }else{
            res.render('misCompras', {productosComprados: productosComprados});
        }
        
    }, 
    editarCuenta: function(req, res){
        let errores = validationResult(req);
        
        if(errores.isEmpty()){
            db.Usuario.update({
                nombre: req.body.nombre,
                apellido: req.body.apellido,
                email: req.body.email,
                /*contrasenia: ,AGREGAR FUNCIONALIDAD*/
                dni: (req.body.dni == '') ? null : req.body.dni,
                domicilio: (req.body.domicilio == '') ? " " : req.body.domicilio,
                codigo_postal: (req.body.codigo_postal == '') ? null : req.body.codigo_postal,
                entre_calles: (req.body.entre_calles == '') ? " " : req.body.entre_calles,
                departamento: (req.body.departamento == '') ? " " :  req.body.departamento,
                ciudad: (req.body.ciudad == '') ? " " : req.body.ciudad,
                telefono: (req.body.telefono == '') ? null : req.body.telefono,
                imagen_usuario: (!req.files[0]) ? this.imagen_usuario : req.files[0].filename,
                updated_at: new Date()
            }, {
                where: {
                    id: req.params.idUsuario
                }
            })
            .then(function(usuario){
                res.redirect('/user/cuenta/' + req.params.idUsuario);
            })
            .catch(function(error){
                res.redirect('/error')
            })
        }else{
            db.Usuario.findByPk(req.session.idUsuarioSession)
            .then(function(usuario){
                res.render('cuenta', {usuario, errores: errores.errors} );
            })
        }
        
    },
    logout: function(req, res, next){
        req.session.destroy();
        res.cookie('idUsuario', '', {maxAge:-1});
        res.redirect('/');
    }
};