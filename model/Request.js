const API = require('../api');

class Requester{
    constructor(){
    }

    lognewArtist(name){
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

    notifyForNewAlbum(id, name, albumName){
        const msg = "se le a agregado al artista "+name+" el album "+albumName+"."
        API.post('/notify', {
            "artistId": id,
            "message": "unqfy te informa que "+ msg,
            "subject": "te llego el mail desde UNQfy"
        })
        .then( response => {
        console.log(response.data)
        })
        .catch( err => {
        console.log(err)
        })
    }

    logForNewAlbum(name, albumName){
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


    logForTrack(name, trackName){
        const msg = "se le a agregado al album "+name+" el track "+trackName+".";
        //LOG
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

module.exports = Requester;