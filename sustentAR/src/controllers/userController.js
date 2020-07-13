const fs = require('fs');
const path = require('path'); 
let bcrypt = require('bcryptjs');  

let usuarios = fs.readFileSync(path.join(__dirname, '../data/usuarios.json'), 'utf8');
usuarios = JSON.parse(usuarios);


let productos = fs.readFileSync(path.join(__dirname, '../data/productos.json'), 'utf8');
productos = JSON.parse(productos);


//  <<--USERCONTROLLER-->>   //
module.exports = {
    cuenta: function(req, res){
        for(let i = 0; i < usuarios.length; i++){
            if(usuarios[i].id == req.params.idUsuario){
                res.render('cuenta', {usuario : usuarios[i]})
            }
        }
        res.render('cuenta', {usuario : usuarios[0]})
    },
    login: function(req, res){
        res.render('login')
    },
    ingresarCuenta: function(req, res){
        for(let i = 0; i < usuarios.length; i++){
            if(usuarios[i].email == req.body.email && bcrypt.compareSync(req.body.contrasenia, usuarios[i].contrasenia)){
                res.redirect('/')
            }
        }
        res.render('login');
    },
    registro: function(req, res){
        res.render('registro')
    },
    registrarNuevoUsuario : function(req, res){
        let nuevoUsuario = {
            id: Number(usuarios.length+1),
            nombre: req.body.nombre,
            apellido: req.body.apellido,
            contrasenia: bcrypt.hashSync(req.body.contrasenia, 10),
            email: req.body.email, 
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
    }
};