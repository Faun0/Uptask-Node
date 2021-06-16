const Proyectos = require('../models/proyectos');
const Proyecto = require('../models/proyectos')
const slug = require('slug')


exports.proyectosHome = async (req,res) => {
    const proyectos = await Proyectos.findAll();
    res.render('index',{
        nombrePagina : 'Proyectos',
        proyectos 
    });
}

exports.formularioProyecto = async (req,res) => {
    const proyectos = await Proyectos.findAll();

    res.render('nuevoProyecto',{
        nombrePagina : 'Nuevo Proyecto',
        proyectos
    })
}

exports.nuevoProyecto = async (req,res) => {
    const proyectos = await Proyectos.findAll();
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
            errores,
            proyectos
        })
    }
    else{
        //No hay errores
        //Inserte en la BD.
        const proyecto = await Proyectos.create({ nombre });
        res.redirect('/');
    }
}

exports.proyectoPorUrl =  async(req, res, nxt) => {

    const proyectos = await Proyectos.findAll();

    const proyecto = await Proyecto.findOne({
        where: {
            url: req.params.url
        }
    });

    if(!proyectos) return next();

    // render a la lista
    res.render('tareas',{
        nombrePagina : 'Tareas del Proyecto',
        proyecto,
        proyectos
    })
}
