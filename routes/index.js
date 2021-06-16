const express = require('express');
const { check } = require('express-validator');
const router = express.Router();

//Importar express validator
const { body } = require('express-validator/check')

//importar el controlador
const proyectosControllers = require ('../controllers/proyectoControllers')


module.exports = function(){
    router.get('/', proyectosControllers.proyectosHome);
    router.get('/nuevo-proyecto',proyectosControllers.formularioProyecto)
    router.post('/nuevo-proyecto',
    body('nombre')
        .not()
        .isEmpty()
        .trim()
        .escape(),
    proyectosControllers.nuevoProyecto
    );

    // Listar  Proyetos
    router.get('/proyectos/:url', proyectosControllers.proyectoPorUrl)
    return router;
}