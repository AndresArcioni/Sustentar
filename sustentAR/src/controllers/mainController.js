const fs = require('fs');
const path = require('path');   

let productos = fs.readFileSync(path.join(__dirname, '../data/productos.json'), 'utf8');
productos = JSON.parse(productos);

//  <<--MAINCONTROLLER-->>   //
module.exports = {
    root: function(req, res) {
        let top4Productos = [];
        for(let i = 0 ; i < 4; i++){
            top4Productos.push(productos[i]);
        }
        res.render('home', {productos: top4Productos})
    },
};