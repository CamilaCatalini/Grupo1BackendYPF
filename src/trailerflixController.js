const fs = require('fs');

function readTrailerflix(){
    const datos = fs.readFileSync(__dirname + process.env.TRAILERFLIX, 'utf8' )
    const DATA = JSON.parse(datos)
    return DATA
}


function getTrailerFind(id){

    const peliculas = readTrailerflix();
    
    let trailer = peliculas.find(p => p.id === id);
    let result;

    //Verifica que se haya encontrado una pelicula con el ID ingresado
    //Verifica si existe el campo trailer y si este no esta en blanco.
    if(trailer?.id && (trailer?.trailer && trailer.trailer != '')){
        result = {
            id: trailer.id,
            titulo: trailer.titulo,
            trailer: trailer.trailer
        }
    }else{
        //Retorna un msj de error si el ID no existe o si la pelicula no tiene trailer.
        let msj = (!trailer?.id) ? 'No se encontro la pelicula.': 'No se encontro el trailer.'; 
        result ={
            error: msj
        }
    }
    
    return result;
}

module.exports = {readTrailerflix, getTrailerFind}