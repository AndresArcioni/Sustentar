function accesoMiddleware(req, res, next){
    if(req.session.idUsuarioSession == undefined){
        res.redirect('/user/login')
    } else {
        next()
    }
}

module.exports = accesoMiddleware;