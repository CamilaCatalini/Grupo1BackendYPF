const fs = require("fs");

function readTrailerflix() {
    const datos = fs.readFileSync(__dirname + process.env.TRAILERFLIX, "utf8");
    const DATA = JSON.parse(datos);
    return DATA;
}

function getTrailerFind(id) {

    let trailer = readTrailerflix().find((p) => p.id === id);

    //Verifica que se haya encontrado una pelicula con el ID ingresado
    //Verifica si existe el campo trailer y si este no esta en blanco.
    if (trailer?.id && trailer?.trailer && trailer.trailer != "") {
        return {
            id: trailer.id,
            titulo: trailer.titulo,
            trailer: trailer.trailer,
        };
    } else {
        //Retorna un msj de error si el ID no existe o si la pelicula no tiene trailer.
        let msj = !trailer?.id ? "No se encontro la pelicula." : "No se encontro el trailer.";
        return {
            error: msj,
        };
    }
}

function getAllOrderByTitle() {
    return readTrailerflix().sort((a, b) => {
        if (a.titulo > b.titulo) return 1;
        if (a.titulo < b.titulo) return -1;
        return 0;
    });
}

function getTitles(titulo) {
    titulo = removeAccent(titulo);
    let movies = readTrailerflix().filter((trailer) => removeAccent(trailer.titulo.toLowerCase()).includes(titulo));
    if (movies == "")
        return {
            error: "no se encontraron coincidencias con ( " + titulo + " )",
        };
    else return movies;
}

function removeAccent(cadena) {
    return cadena.replace("á", "a").replace("é", "e").replace("í", "i").replace("ó", "o").replace("ú", "u");
}

function getCategory(cat) {
    let movies = readTrailerflix();
    let result = movies.filter((item) => removeAccent(item.categoria.toLowerCase()) === removeAccent(cat.toLowerCase()));
    if (result != "") {
        return result;
    } else {
        return {error: "El parámetro ingresado no arrojó ningún resultado"};
    }
}

module.exports = {readTrailerflix, getTrailerFind, getAllOrderByTitle, getTitles, getCategory};
