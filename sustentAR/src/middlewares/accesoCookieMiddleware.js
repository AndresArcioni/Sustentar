const fs = require('fs');
const path = require('path');
const db = require('../database/models');


function accesoCookieMiddleware (req, res, next){
    if (req.cookies.idUsuario != undefined && req.session.idUsuarioSession == undefined){
        db.Usuario.findByPk(req.cookies.idUsuario)
        .then(function(usuario){
            if(req.cookies.idUsuario == usuario.id){
                req.session.idUsuarioSession = usuario.id;
            }
        })
    }

    next()
}

module.exports = accesoCookieMiddleware;