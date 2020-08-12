const fs = require('fs');
const path = require('path'); 
let bcrypt = require('bcryptjs');  
const validarUsuario = require('../validations/validarUsuario.js');
const {check, validationResult, body} = require('express-validator');
const db = require('../database/models');

let usuarios = fs.readFileSync(path.join(__dirname, '../data/usuarios.json'), 'utf8');
usuarios = JSON.parse(usuarios);


let productos = fs.readFileSync(path.join(__dirname, '../data/productos.json'), 'utf8');
productos = JSON.parse(productos);


//  <<--USERCONTROLLER-->>   //
module.exports = {
    cuenta: function(req, res){
        for(let i = 0; i < usuarios.length; i++){
            if(req.cookies.idUsuario == undefined){
                if(usuarios[i].id == req.session.idUsuarioSession){
                    res.render('cuenta', {usuario : usuarios[i]})
                }
            }else{
                if(usuarios[i].id == req.cookies.idUsuario){
                    res.render('cuenta', {usuario : usuarios[i]})
                }
            }
        }
        res.send('ERROR');
    },
    login: function(req, res){
        res.render('login')
    },
    ingresarCuenta: function(req, res, next){
        let errores = validationResult(req);
        /*return res.send(errores);*/

            db.Usuario.findAll()
            .then(function(resultados) {
                for(let i = 0; i < resultados.length; i++){
                    if(resultados[i].dataValues.email == req.body.email && bcrypt.compareSync(req.body.contrasenia, resultados[i].dataValues.contrasenia)){
                        res.redirect('/');
                    }
                }
                /*
                if(bcrypt.compareSync(req.body.contrasenia, resultado.dataValues.contrasenia)){

                    req.session.idUsuarioSession = resultado.dataValues.id;
                    if(req.body.recordame != undefined){
                        res.cookie('idUsuario', resultado.dataValues.id, {maxAge: 604800000});
                    }
                    return res.redirect('/');
                }*/
                  
            })
            res.render('login');
        
        // console.log(errores.errors);
        /*
        return res.render('login', {errores : [
            {
                msg: 'hola'
            },
            {
                msg: 'hola'
            }
        ]});*/

        /*verify: function(req, res, next) {
               let errors = validationResult(req);
               db.Usuario.findAll()
               .then(function(usuarios) {
                 if(errors.isEmpty()) {
                   for(let i = 0; i < usuarios.length; i++) {
                     if(usuarios[i].email == req.body.email && bcrypt.compareSync(req.body.password, usuarios[i].password)) {
                       req.session.emailUsuario = usuarios[i].email;
                       if(req.body.remember != undefined) {
                         res.cookie('authRemember', usuarios[i].email, {maxAge: 60000 * 60 * 24 * 7}) Vigente 1 semana!
                       }
                      res.redirect('/users')
                     }
                   }
                   return res.render('login', {
                     errors: {
                       email: {
                         msg: 'Credenciales inválidas. Inserta un email registrado y su respectiva contraseña'
                       }
                     }
                   })
                 } else {
                   res.render('login', {
                     errors: errors.mapped(),
                     old: req.body
                   })
                 }
               }
               )},*/
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
                imagen_usuario: (req.files[0] == undefined) ? '/images/Logo_de_PaginaWeb.png'  : req.files[0].filename, 
                dni: " ",
                direccion: " ",
                depto: " ",
                codigoPostal: " ",
                ciudad: " ",
                entreCalles: " ",
                nroTelefono: " ",
                rol: '',
                created_at: new Date(),
                updated_at: new Date(),
                carrito_id: '',
                historial_compras_id: ''
            }

            db.Carrito.create({
                total: 0
            })
            .then(function(result){

                nuevoUsuario.carrito_id = result.id;

                db.Historial_compra.create({
                    id_carrito: result.id
                })
                .then(function(resultado){
                    nuevoUsuario.historial_compras_id = resultado.id;

                    db.Usuario.create(nuevoUsuario)
                    .then(function(){
                        res.redirect('/user/login')
                    })
                })                
            })
            
            /*
            .then(function(result){
                result.carrito_id = db.Carrito.create({
                    total: 0
                })
            })
            .then(function(result){
                result.historial_compras_id = db.Historial_Compra.create()
                res.redirect('/user/login')
            })*/
            .catch(function(e){
                res.send(e);
            })
                       
        } else {
            res.render('registro', {errores : errores.errors});
        }
  
    },
    misCompras: function(req, res){
        let productosComprados = []; 

        let usuario = validarUsuario(req, res);
        if(usuario){
            res.render('misCompras', {productosComprados: productosComprados, usuario : usuario});
        }else{
            res.render('misCompras', {productosComprados: productosComprados});
        }

        
    }, 
    editarCuenta: function(req, res){

        db.Usuario.update({
            nombre: req.body.nombre,
            apellido: req.body.apellido,
            email: req.body.email,
            /*contrasenia: ,AGREGAR FUNCIONALIDAD*/
            dni: (req.body.dni == undefined) ? " " : req.body.dni,
            domicilio: (req.body.direccion == undefined) ? " " : req.body.domicilio,
            codigo_postal: (req.body.codigo_postal == undefined) ? " " : req.body.codigo_postal,
            entre_calles: (req.body.entre_calles == undefined) ? " " : req.body.entre_calles,
            departamento: (req.body.departamento == undefined) ? " " :  req.body.departamento,
            ciudad: (req.body.ciudad == undefined) ? " " : req.body.ciudad,
            telefono: (req.body.telefono == undefined) ? " " : req.body.telefono,
            imagen_usuario: (!req.files[0]) ? this.imagen_usuario : req.files[0].filename,
            updated_at: new Date()
        }, {
            where: {
                id: req.params.idUsuario
            }
        })
        .then(function(resultado){
            res.render('cuenta', {usuario: resultado})
        })
        
        for(let i = 0; i < usuarios.length; i++){
            if(usuarios[i].id == req.params.idUsuario){
                usuarios[i].nombre =  req.body.nombre;
                usuarios[i].apellido = req.body.apellido;
                usuarios[i].email = req.body.email; 
                usuarios[i].dni =  (req.body.dni == undefined) ? " " : req.body.dni;
                usuarios[i].direccion = (req.body.direccion == undefined) ? " " : req.body.direccion;
                usuarios[i].depto = (req.body.depto == undefined) ? " " :  req.body.depto;
                usuarios[i].codigoPostal = (req.body.codigoPostal == undefined) ? " " : req.body.codigoPostal;
                usuarios[i].ciudad =  (req.body.ciudad == undefined) ? " " : req.body.ciudad;
                usuarios[i].entreCalles =  (req.body.entreCalles == undefined) ? " " : req.body.entreCalles;
                usuarios[i].nroTelefono = (req.body.nroTelefono == undefined) ? " " : req.body.nroTelefono;
                usuarios[i].avatar = (!req.files[0]) ? usuarios[i].avatar : req.files[0].filename;
                fs.writeFileSync(path.join(__dirname, '../data/usuarios.json'), JSON.stringify(usuarios));
                res.render('cuenta', {usuario: usuarios[i]})
            }
        }
        res.render('error');
    },
    logout: function(req, res, next){
        req.session.destroy();
        res.cookie('idUsuario', '', {maxAge:-1});
        res.redirect('/');
    }
};