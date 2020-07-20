function cuentaMiddleware(req, res, next){
    if(req.cookies.idUsuario){
        next();
    } else {
        if(req.session.idUsuarioSession){
            next();
        }
    }
    res.redirect('/user/login')
}

module.exports = cuentaMiddleware;