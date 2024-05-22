const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const app = express();

//MIDDLEWARE 
const bodyParser = require('body-parser');
app.use(bodyParser.json());

const { readTrailerflix, getTrailerFind ,getAllOrderByTitle,getTitles} = require('./src/trailerflixController');
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


//  “/catalogo” ordenado por nombre
//ej --> http://localhost:3008/catalogo
app.get("/catalogo",(req,res)=>{
    res.json(getAllOrderByTitle(DB));
})



//ej --> http://localhost:3008/titulo/guasón
//       http://localhost:3008/titulo/guas
app.get("/titulo/:title",(req,res)=>{
    res.json(getTitles(req.params.title.toLowerCase()));
})

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

//ej --> http://localhost:3008/trailer/34
app.get('/trailer/:id',(req,res)=>{
    const id = parseInt(req.params.id);
    const trailer = getTrailerFind(id);
    res.send(trailer);
})

// Leer las recomendaciones de: https://github.com/mariaelisaaraya/tp1ObligatorioIngenias/blob/master/readme.md


// Mensaje de error pagina no encontrada
app.get('*', (req, res) => {
    res.status(404).send('Lo siento, la página que buscas no existe.'); 
});

// Inicia el servidor
app.listen(PORT, () => {
    console.log(`Servidor iniciado en el puerto http://localhost:${PORT}`);
});