

class RequestNotification{
    constructor(){}

    newAlbum(id, name, albumName){
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
}

module.exports = RequestNotification