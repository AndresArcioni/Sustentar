const fs = require('fs');
const path = require('path')


let usuarios = fs.readFileSync(path.join(__dirname, '../data/usuarios.json'), 'utf8');
usuarios = JSON.parse(usuarios);

function accesoCookieMiddleware (req, res, next){
    if (req.cookies.idUsuario != undefined && req.session.idUsuarioSession == undefined){
        for(let i = 0 ; i < usuarios.length ; i++){
            if(req.cookies.idUsuario == usuarios[i].id){
                req.session.idUsuarioSession = usuarios[i].id
            }
        }
    }

    next()
}

module.exports = accesoCookieMiddleware;