const Proyectos = require('../models/proyectos');
const Proyecto = require('../models/proyectos')
const slug = require('slug')


exports.proyectosHome = (req,res) => {
    res.render('index',{
        nombrePagina : 'Proyectos'
    });
}

exports.formularioProyecto = (req,res) => {
    res.render('nuevoProyecto',{
        nombrePagina : 'Nuevo Proyecto'
    })
}

exports.nuevoProyecto = async (req,res) => {
    //Enviar a la consola lo que el usuario escriba
    //console.log(req.body)

    //Validar datos del input
    const { nombre } = req.body;

    let errores = [];

    if(!nombre){
        errores.push({'texto' : 'Agrega un nombre al Proyecto' })
    }

    //Si haya errores
    if(errores.length > 0){
        res.render('nuevoProyecto', { 
            nombrePagina : 'Nuevo Proyecto',
            errores
        })
    }
    else{
        //No hay errores
        //Inserte en la BD.
        const proyecto = await Proyectos.create({ nombre });
        res.redirect('/');
    }
}
