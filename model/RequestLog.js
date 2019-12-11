const API = require('../api');

class RequestLog{
    constructor(){
    }

    newArtist(name){
        API.postLog({
            "message": "se agrego el artista " + name +"."
          })
          .then( response => {
            console.log(response.data)
          })
          .catch( err => {
            console.log(err)
          })
    }

    newAlbum(name, albumName){
        const msg = "se le a agregado al artista "+name+" el album "+albumName+"."
        API.postLog({
            "message": msg
          })
          .then( response => {
            console.log(response.data)
          })
          .catch( err => {
            console.log(err)
          })
    }

    newTrack(name, trackName){
        const msg = "se le a agregado al album "+name+" el track "+trackName+".";
        API.postLog({
          "message": msg
        })
        .then( response => {
          console.log(response.data)
        })
        .catch( err => {
          console.log(err)
        })
    
    }
}

module.exports = RequestLog;