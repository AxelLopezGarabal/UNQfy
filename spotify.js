
const creds = require('./spotifyCreds.json').access_token
const fs = require('fs');
const CREDENTIALS_FILENAME = 'spotifyResponse.json';

const rp = require('request-promise');
//	/v1/artists/{id}/albums


function artistOption(artistName){
    return{
        url: 'https://api.spotify.com/v1/search?q=artist:'+artistName+'&type=artist',
        headers: { Authorization: 'Bearer ' + creds },
        json: true,
        limit: 50
        }
}
function albumOptions(id) {
    return{
        url: 'https://api.spotify.com/v1/artists/'+id+'/albums?',
        headers: { Authorization: 'Bearer ' + creds },
        json: true,
        limit: 50
        }
    }



class Populator{//devuelve la lista de albumes tal como la manda spotify
    constructor(){}
    populateResult(artistName){
        const artistOptions = artistOption(artistName)
        return rp.get(artistOptions)
        .then((response) => {
        return response.artists.items[0].id
        }).then(id => {
            const x = rp.get(albumOptions(id))
            console.log('spot',x)

            return x
    })
        .catch(error => console.log(error))
    }

}

    exports.module = {
        Populator,
    }