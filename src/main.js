/*
 En esta funcion deberán interpretar los argumentos pasado por linea de comandos
 e implementar los diferentes comandos.

  Se deberán implementar los comandos:
    - Alta y baja de Artista
    - Alta y Baja de Albums
    - Alta y Baja de tracks

    - Listar todos los Artistas
    - Listar todos los albumes de un artista
    - Listar todos los tracks de un album

    - Busqueda de canciones intepretadas por un determinado artista
    - Busqueda de canciones por genero

    - Dado un string, imprimmir todas las entidades (artistas, albums, tracks, playlists) que coincidan parcialmente
    con el string pasado.

    - Dada un nombre de playlist, una lista de generos y una duración máxima, crear una playlist que contenga
    tracks que tengan canciones con esos generos y que tenga como duración máxima la pasada por parámetro.

  La implementacion de los comandos deberá ser de la forma:
   1. Obtener argumentos de linea de comando
   2. Obtener instancia de UNQfy (getUNQFy)
   3. Ejecutar el comando correspondiente en Unqfy
   4. Guardar el estado de UNQfy (saveUNQfy)

*/

const fs       = require('fs') // necesitado para guardar/cargar unqfy
const {UNQfy}  = require('./unqfy') // importamos el modulo unqfy
const Terminal = require('./terminal/Terminal')

// Retorna una instancia de UNQfy. Si existe filename, recupera la instancia desde el archivo.
function getUNQfy(filename = 'data.json') {
  return fs.existsSync(filename)
      ? UNQfy.load(filename)
      : new UNQfy()
}

function saveUNQfy(unqfy, filename = 'data.json') {
  unqfy.save(filename)
}

function main() {
  const unqfy    = getUNQfy('backUp.json')

  //const terminal = new Terminal({unqfy})
  const terminal = new Terminal({unqfy, resultHandler: result => console.log(JSON.stringify(result, null, '    '))})
  // const terminal = new Terminal({unqfy, resultHandler: result => console.log(JSON.stringify(result))})

  const [,,commandName, ...args] = process.argv
  
  terminal.run(commandName, args)

  saveUNQfy(unqfy, 'backUp.json')
}

main()
