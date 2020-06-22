//  <<--MAINCONTROLLER-->>   //
module.exports = {
    root: function(req, res) {
        res.render('home')
    },
    busquedaAvanzada: function(req, res){
        res.render('busquedaDeProductos');
    },
    formularioProductos: function(req, res){
        res.render('formularioProductos')
    },
    cuenta: function(req, res){
        res.render('cuenta')
    }
};

