const fs = require('fs');
const path = require('path'); 
const db = require('../database/models');




async function validarUsuario(req, res){
    /*
    if(req.cookies.idUsuario != undefined){
        db.Usuario.findByPk(req.cookies.idUsuario)
        .then(function(usuario){
            return usuario
        })
    }
    if(req.session.idUsuarioSession != undefined){
        
        db.Usuario.findByPk(req.session.idUsuarioSession)
        .then(function(usuario){
            return usuario
        })
    }*/
    /*if(req.cookies.idUsuario != undefined){
        return req.cookies.idUsuario;
    }else{
        if(req.session.idUsuarioSession != undefined){
            return req.session.idUsuarioSession;
        }
    }
    return false;
    */
   
/*
    db.Usuario.findByPk()*/

    /*
    db.Usuario.findAll()
    .then(function(usuarios){
        for(let i = 0; i < usuarios.length; i++){
            if(req.cookies.idUsuario == undefined){
                if(usuarios[i].id == req.session.idUsuarioSession){
                    return usuarios[i];
                }
            }else{
                if(usuarios[i].id == req.cookies.idUsuario){
                    return usuarios[i];
                }
            }
        }
        return null;
    })*/
}
module.exports = validarUsuario;