//  <<--USERCONTROLLER-->>   //
module.exports = {
    cuenta: function(req, res){
        res.render('cuenta')
    },
    login: function(req, res){
        res.render('login')
    },
    registro: function(req, res){
        res.render('registro')
    },
    misCompras: function(req, res){
        res.render('misCompras');
    }, 
    editarCuenta: function(req, res){
        res.render('cuenta')
    }
};