const fs = require('fs');
const path = require('path'); 
let bcrypt = require('bcryptjs');  
const {check, validationResult, body} = require('express-validator');

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
    ingresarCuenta: function(req, res){
        let errores = validationResult(req);
        //res.send(errores)

        if(errores.isEmpty()){
            for(let i = 0; i < usuarios.length; i++){
                if(usuarios[i].email == req.body.email && bcrypt.compareSync(req.body.contrasenia, usuarios[i].contrasenia)){
                    req.session.idUsuarioSession = usuarios[i].id;
                    if(req.body.recordame != undefined){
                        res.cookie('idUsuario', usuarios[i].id, {maxAge: 604800000});
                    }
                    res.redirect('/')
                }
            }
        }
        res.render('login', {errores : errores.errors});
        
    },
    registro: function(req, res){
        res.render('registro')
    },
    registrarNuevoUsuario : function(req, res, next){

        let errores = validationResult(req);
        
        if(errores.isEmpty()){
            let nuevoUsuario = {
                id: Number(usuarios.length+1),
                nombre: req.body.nombre,
                apellido: req.body.apellido,
                contrasenia: bcrypt.hashSync(req.body.contrasenia, 10),
                email: req.body.email,
                avatar: (req.files[0].filename == undefined) ? req.files[0].filename = '/images/Logo_de_PaginaWeb.png' : req.files[0].filename, 
                dni: " ",
                direccion: " ",
                depto: " ",
                codigoPostal: " ",
                ciudad: " ",
                entreCalles: " ",
                nroTelefono: " "
            }
            usuarios.push(nuevoUsuario);
            fs.writeFileSync(path.join(__dirname, '../data/usuarios.json'), JSON.stringify(usuarios));
    
            res.redirect('/user/login');
        } else {
            res.render('registro', {errores : errores.errors});
        }
  
    },
    misCompras: function(req, res){
        let productosComprados = []; 
        res.render('misCompras', {productosComprados: productosComprados});
    }, 
    editarCuenta: function(req, res){
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