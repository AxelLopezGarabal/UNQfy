
const creds = require('./spotifyCreds.json').access_token
const fs = require('fs');
const CREDENTIALS_FILENAME = 'spotifyResponse.json';

const rp = require('request-promise');
//	/v1/artists/{id}/albums
const artistOptions = {
    url: 'https://api.spotify.com/v1/search?q=artist:gorillaz&type=artist',
    headers: { Authorization: 'Bearer ' + creds },
    json: true,
    limit: 50
    };
function albumOptions(id) {
    return{
        url: 'https://api.spotify.com/v1/artists/'+id+'/albums',
        headers: { Authorization: 'Bearer ' + creds },
        json: true,
        limit: 50
        }
    }
rp.get(artistOptions)
    .then((response) => {console.log(response)
        console.log( );console.log( );console.log( );console.log( )
    console.log(response.artists.items[0]);console.log( )
    return response.artists.items[0].id
    }).then(id =>
    rp.get(albumOptions(id)).then(response2 => {console.log(response)
        console.log( );console.log( );console.log( );console.log(response2)}))
    
    .catch(error => console.log(error))
