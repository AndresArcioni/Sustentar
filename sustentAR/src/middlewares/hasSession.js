const db = require('../database/models');

async function hasSession(req, res, next) {
    if(req.session.idUsuarioSession != undefined) {
        let usuario = await db.Usuario.findByPk(req.session.idUsuarioSession)
        .then(function(response) {
            res.locals.usuarioLogueado = {
                id: response.id,
                nombre: response.nombre,
                email: response.email
            }
        })
        .catch(function(error) {
            res.json(error)
        })
    }
    next()
}

module.exports = hasSession;
