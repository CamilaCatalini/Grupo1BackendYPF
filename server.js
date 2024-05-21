const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const app = express();

//MIDDLEWARE 
const bodyParser = require('body-parser');
app.use(bodyParser.json());

const { readTrailerflix } = require('./src/trailerflixController');
const PORT = process.env.PORT || 3000;
let DB = [];
app.use((req,res,next)=>{
    DB = readTrailerflix();
    next();
})

// SERVIDOR WEB
// metodo get generico
app.get('/', (req,res)=>{
    res.send(DB)
});

//PARA REALIZAR!!!

// *** ENDPOINT 1 ***
// Ruta --> “/catalogo”
// Crea un endpoint llamado /catalogo que liste todo el contenido de trailerflix JSON

// *** ENDPOINT 2 ***
// Ruta --> “/titulo/:title”
// Crea un endpoint llamado /titulo/:title que liste el catálogo de películas y/o series 
//que se aproxime al título enviado. (la búsqueda del nombre debe ser parcial)

// *** ENDPOINT 3 ***
// Ruta --> “/categoria/:cat”
// Crea un endpoint llamado /categoria/:cat que liste todo el contenido del archivo JSON 
// de acuerdo a la categoría enviada como parámetro (serie o película)

// *** ENDPOINT 4 ***
// Ruta --> “/reparto/:act ”
// Crea un endpoint llamado /reparto/:act que liste el catálogo que incluya a la actriz o 
//actor indicado por el nombre. (la búsqueda del nombre debe ser parcial)

// *** ENDPOINT 5 ***
// Ruta --> “/trailer/:id”
// Crea un endpoint llamado /trailer/:id que retorne la URL del trailer de la película o serie. 
// Si ésta no posee video asociado, que retorne un mensaje en formato JSON notificando la no disponibilidad del mismo.


// Leer las recomendaciones de: https://github.com/mariaelisaaraya/tp1ObligatorioIngenias/blob/master/readme.md


// Mensaje de error pagina no encontrada
app.get('*', (req, res) => {
    res.status(404).send('Lo siento, la página que buscas no existe.'); 
});

// Inicia el servidor
app.listen(PORT, () => {
    console.log(`Servidor iniciado en el puerto http://localhost:${PORT}`);
});