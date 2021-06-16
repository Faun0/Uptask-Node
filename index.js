const express = require('express');
const routes = require('./routes');
const path = require('path');
const bodyParser = require('body-parser');

//helpers con algunas funciones
const helpers =require('./helpers');

//Crear la conexion a la BD
const db = require('./config/db');

//Importar el modelo
require('./models/proyectos')

db.sync()
    .then( () => console.log('Conectado al Servidor') )
    .catch(error => console.log(error));

//crear una app de xpress
const app = express();

// Habilitar pug
app.set('view engine', 'pug');

//Pasar var dump a la aplicacion
app.use((req, res, next) => {
    res.locals.vardump = helpers.vardump;
    next();
});

// Carga de archivos estaticos
app.use(express.static('public'));

//Añadir la carpeta de las vistas
app.set('views', path.join(__dirname, './views'))

//Habilitar Bodyparser para leer datos el formulario
app.use(bodyParser.urlencoded({extended : true}))

//ruta para el home
app.use('/', routes())

app.listen(3000);