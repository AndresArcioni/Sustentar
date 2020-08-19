const fs = require('fs');
const path = require('path'); 
const db = require('../database/models');




function validarUsuario(req, res){
    if(req.cookies.idUsuario != undefined){
        return req.cookies.idUsuario;
    }else{
        if(req.session.idUsuarioSession != undefined){
            return req.session.idUsuarioSession;
        }
    }
    return false;
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
        return false;
    })*/
}
module.exports = validarUsuario;