const fs = require('fs');
const path = require('path'); 

let usuarios = fs.readFileSync(path.join(__dirname, '../data/usuarios.json'), 'utf8');
usuarios = JSON.parse(usuarios);


function validarUsuario(req, res){
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
}
module.exports = validarUsuario;