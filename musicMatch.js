
const rp = require('request-promise');


function idRequest(trackName){
}

function lyricsRequest(id){
    return{
        url:'https://api.musixmatch.com/ws/1.1/track.lyrics.get?track_id='+id
    }
}

class LyricFinder{
    constructor(){}
    getLyrics(trackName, trackArtist){
        const BASE_URL = 'http://api.musixmatch.com/ws/1.1';
        var options = {
            uri: BASE_URL + '/track.search',
            qs: {
            apikey: 'a5f2515454732b5a519e3f23258b630d',
                q_track: trackName,
                q_artist: trackArtist
            },
            json: true // Automatically parses the JSON string in the response
        };
    rp.get(options)
    .then((response) => {
        var header = response.message.header;
        var body = response.message.body;
        if (header.status_code !== 200){
            throw new Error('status code != 200');
            }
        var artistNames = body.artist_list.map((artist =>
            artist.artist.artist_name));
            console.log(`Se econtraron ${artistNames.length} artistas`);
            console.log(artistNames);
            }).catch((error) => {
            console.log('algo salio mal', error);
            }
        );
    }
}