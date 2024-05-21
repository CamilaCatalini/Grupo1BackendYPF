const fs = require('fs');

function readTrailerflix(){
    const datos = fs.readFileSync(__dirname + process.env.TRAILERFLIX, 'utf8' )
    const DATA = JSON.parse(datos)
    return DATA
}

module.exports = {readTrailerflix}