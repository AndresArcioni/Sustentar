const fs = require('fs');
const path = require('path');   
const db = require('../database/models');

//  <<--MAINCONTROLLER-->>   //
module.exports = {
    root: async function(req, res){
        
        db.Producto.findAll({
            include: [{association: 'imagenes'}]
        })
        .then(function(listadoDeProductos){
            return listadoDeProductos;
        })
        .then(function(productos){
            if(req.session.idUsuarioSession != undefined){
                res.render('home', {productos: productos, usuario : req.session.idUsuarioSession});
            }else{
                res.render('home', {productos: productos});
            }
        })
        .catch(function(error) {
            res.send(error)
        })
        
    }
};