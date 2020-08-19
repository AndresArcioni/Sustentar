const fs = require('fs');
const path = require('path');
const db = require('../database/models');


//Traemos los productos de la DB
async function obtenerProductos(){
    db.Producto.findAll()
    .then(function(listadoDeProductos){
        return listadoDeProductos.json()
    })
}


    //  <<--PRODUCTSCONTROLLER-->>   //
module.exports = {
    listarProductos: async function(req, res){//Falta traer caetogiras p/poder filtrar

        db.Producto.findAll({
            include: [{association: 'imagenes'}]
        })
        .then(function(listadoDeProductos){
            return listadoDeProductos
        })
        .then(function(productos){
            if(req.session.idUsuario != undefined){
                return res.send(productos);
                res.redirect('listadoDeProductos', {productos: productos, usuario : req.session.idUsuario});
            }else{
                res.render('listadoDeProductos', {productos: productos});
            }
        })
        .catch(function(error) {
            res.send(error)
        })
        
    },
    formularioProductos: async function(req, res){
        let colores = await db.Color.findAll();
        let sustentabilidad = await db.Sustentabilidad.findAll();
        let categorias = await db.Categoria.findAll();
        res.render('formularioProductos', {colores, categorias, sustentabilidad});
    },
    detail: function(req, res) {


        db.Producto.findByPk(req.params.idProducto, {
            include: [{association: 'imagenes'}]
        })
        .then(function(producto){
            db.Producto.findAll({
                include: [{association: 'imagenes'}]
            })
            .then(function(productos){
                if(req.session.idUsuario != undefined){
                    res.render('detalleDelProducto', {producto : producto,  usuario : req.session.idUsuario, productos: productos})
                }else{
                    res.render('detalleDelProducto', {producto : producto, productos: productos})
                }
            })
            
        })
        
    },
    agregarACarrito : function(req, res){
        let data = req.body;
        //ACA TIENE QUE SUMAR AL CARRITO DEL USUARIO
        res.send(req.body);
    },
    editarProducto : async function(req, res){
        
        let colores = await db.Color.findAll();
        let sustentabilidad = await db.Sustentabilidad.findAll();
        let categorias = await db.Categoria.findAll();

        db.Producto.findByPk(req.params.idProducto,{
            include: [
                {association: 'imagenes'},
                {
                    model: db.Color,
                    as: 'colores',
                    through: {
                      model: db.Producto_color
                    }
                },
                {
                    model: db.Sustentabilidad,
                    as: 'sustentabilidad',
                    through: {
                      model: db.Producto_sustentabilidad
                    }
                }
            ]
        })
        .then(function(producto) {
            return res.send(producto);
            if(req.session.idUsuario != undefined){
                res.render('editarProducto', {producto: producto, usuario : req.session.idUsuario, colores, sustentabilidad, categorias})
            }else{
                res.render('editarProducto', {producto: producto, colores, sustentabilidad, categorias})
            }            
        })
        .catch(function(error){
            res.send(error)
        })

        /*let producto;
        for(let i = 0; i < productos.length; i++){
            if(productos[i].id == req.params.idProducto){
                producto = productos[i];
            }
        }

        let usuario = validarUsuario(req, res);
        if(usuario){
            res.render('editarProducto', {producto: producto, usuario : usuario})
        }else{
            res.render('editarProducto', {producto: producto})
        }*/
    },
    actualizarProducto : function(req, res){
        
        
        db.Producto.update({
            nombre: req.body.nombreProducto,
            precio: req.body.precio,
            stock: req.body.stock,
            descuento: req.body.descuento,
            descripcion: req.body.descripcionProducto,
            id_categoria: req.body.categoria,


            //sustentabilidad: req.body.sustentabilidad, hacer un destroy y luego un create

            //colores: req.body.colores,

            //imagenes: (!req.files[0]) ? productos[i].imagen1 : req.files[0].filename,
        },
            {
            where: {
                id: req.params.idProducto
            }
        })
        /*
        for (let i = 0; i < productos.length; i++){
            if(req.params.idProducto == productos[i].id){
                let productoActualizado = {
                    id: productos[i].id,
                    nombreProducto: req.body.nombreProducto,
                    precio: req.body.precio,
                    stock: req.body.stock,
                    descuento: req.body.descuento,
                    descripcionProducto: req.body.descripcionProducto,
                    colores: req.body.colores,
                    sustentabilidad: req.body.sustentabilidad,
                    imagen1: (!req.files[0]) ? productos[i].imagen1 : req.files[0].filename,
                    imagen2: (!req.files[1]) ? productos[i].imagen2: req.files[1].filename,
                    imagen3: (!req.files[2]) ? productos[i].imagen3 : req.files[2].filename,
                }
                productos[i] = productoActualizado;
            }
        }*/
    },
    crearProducto: function(req, res){
        //return res.send(req.body)
        db.Producto.create({
            nombre: req.body.nombre,
            precio: Number(req.body.precio),
            stock: req.body.stock,
            descuento: Number(req.body.descuento),
            descripcion: req.body.descripcion,
            id_categoria: Number(req.body.categoria)
        })
        .then(function(nuevoProducto){
            let imagenes = req.files.map(elemento => {
                return {
                    nombre: elemento.filename,
                    id_producto: nuevoProducto.id
                }
            })
            db.Imagen_producto.bulkCreate(imagenes);

            let arrSustConverter = [];
            if (req.body.sustentabilidad.length == 1){
                arrSustConverter.push(req.body.sustentabilidad);

                let sust = arrSustConverter.map(elemento => {
                    return {
                        id_producto: nuevoProducto.id,
                        id_sustentabilidad: elemento
                    }
                })
                db.Producto_sustentabilidad.bulkCreate(sust); 
            }else{
                let sust = req.body.sustentabilidad.map(elemento => {
                    return {
                        id_producto: nuevoProducto.id,
                        id_sustentabilidad: elemento
                    }
                })
                db.Producto_sustentabilidad.bulkCreate(sust);
            }
/*
            let sustentabilidad = [];
            if(req.body.sustentabilidad.length == 1){
                sustentabilidad.push(req.body.sustentabilidad);
            }else{
                sustentabilidad = req.body.sustentabilidad.map(elemento => {
                    return {
                        id_producto: nuevoProducto.id,
                        id_sustentabilidad: elemento
                    }
                })
            }
            db.Productos_sustentabilidad.bulkCreate(sustentabilidad);*/
            
            //CAMBIAR COLOR COMO SUSTENTABILIDAD
            let arrColorConverter = [];
            if (req.body.color.length == 1){
                arrColorConverter.push(req.body.color);

                let color = arrColorConverter.map(elemento => {
                    return {
                        id_producto: nuevoProducto.id,
                        id_colores: elemento
                    }
                })
                db.Producto_color.bulkCreate(color); 
            }else{
                let color = req.body.color.map(elemento => {
                    return {
                        id_producto: nuevoProducto.id,
                        id_colores: elemento
                    }
                })
                db.Producto_color.bulkCreate(color);
            }
       
          

        }).then(function(producto){
            res.redirect('/product/listadoDeProductos');
        })
        .catch(function(error){
            res.send(error)
        })
    },
    borrarProducto : function(req, res){
        console.log(req.params.idProducto);
        productos.forEach(elemento => {
            if(elemento.id == req.params.idProducto) {
                productos.splice(productos.indexOf(elemento), 1)
                fs.writeFileSync(path.join(__dirname, '../data/productos.json'), JSON.stringify(productos));
        }})
        //PARA BORRAR LA IMAGEN AL BORRAR EL PRODUCTO
        //fs.unlinkSync(path.join(ruta de la imagen, nombre de la imagen));
        res.redirect('/product/listadoDeProductos');
    }
}