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

const fs = require('fs'); // necesitado para guardar/cargar unqfy
const unqmod = require('./unqfy'); // importamos el modulo unqfy
const controllerModule = require('./Controller');


// Retorna una instancia de UNQfy. Si existe filename, recupera la instancia desde el archivo.
function getUNQfy(filename = 'data.json') {
  let unqfy = new unqmod.UNQfy();
  if (fs.existsSync(filename)) {
    unqfy = unqmod.UNQfy.load(filename);
  }
  return unqfy;
}

function saveUNQfy(unqfy, filename = 'data.json') {
  unqfy.save(filename);
}

//node main addArtista "Deadmau5" "Canada"
//node main addAlbum "Deadmau5" "2x4" "2012"
//node main addTrack "2x4" "Animal Rigths" "200s" ["electro"]
//node main removeArtista "Deadmau5"

//> >  TODO < <

//node main createPlaylist Playlist_name, genres, MAX_duration
//node main removeAlbum "Deadmau5" "2x4"
//node main removeTrack "2x4" "Animal Rigths"
//node main removePlaylist Playlist_name

function main() {
  let unqfy = getUNQfy('backUp.json');
  let controller = new controllerModule.Controller();
  controller.setUNQfy(unqfy);

  let f = process.argv[2];
  let args = process.argv.slice(3);

  console.log("");
  console.log(args);
  
  try{
    controller[f](args);
  }catch(error){
    console.log(error)
  }

  console.log("");
  console.log(unqfy);
  saveUNQfy(unqfy, 'backUp.json')
}

main();
