
const rp = require('request-promise');


function idRequest(trackName, artistName){
    
    var options = {
        uri: 'http://api.musixmatch.com/ws/1.1/track.search',
        qs: {
        apikey: 'a5f2515454732b5a519e3f23258b630d',
            q_track: trackName,
            q_artist: artistName   
        },
        json: true // Automatically parses the JSON string in the response
    };
    return{
        options
    }
}

function lyricsRequest(trackId){
    
    var options = {
        uri: 'http://api.musixmatch.com/ws/1.1/track.lyrics.get',
        qs: {
        apikey: 'a5f2515454732b5a519e3f23258b630d',
            track_id: trackId
        },
        json: true // Automatically parses the JSON string in the response
    };
    return options
}
    //url:'https://api.musixmatch.com/ws/1.1/track.lyrics.get?track_id='+id

class LyricFinder{
    constructor(){
    }
    getLyrics(trackName, artistName){
        const BASE_URL = 'http://api.musixmatch.com/ws/1.1';
        var options = {
            uri: BASE_URL + '/track.search',
            qs: {
            apikey: 'a5f2515454732b5a519e3f23258b630d',
                q_track: trackName,
                q_artist: artistName   
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
            var trackId = body.track_list[0].track.track_id
            return trackId
            //var artistNames = body.artist_list.map((artist =>
              //  artist.artist.artist_name));
                //console.log(`Se econtraron ${artistNames.length} artistas`);
            //    console.log(artistNames);
        }).then((id)=> 
            {   var options = {
                uri: 'http://api.musixmatch.com/ws/1.1/track.lyrics.get',
                qs: {
                apikey: 'a5f2515454732b5a519e3f23258b630d',
                    track_id: id
                },
                json: true // Automatically parses the JSON string in the response
            };
                var x = rp.get(options)
                console.log('esto es la response',x)
                return x}
        ).then(response => {
            console.log(response)
            var header = response.message.header;
            var body = response.message.body;
            console.log('el body de la busqueda de lyrics es ',response)
            if (header.status_code !== 200){
                throw new Error(header.status_code,'status code != 200');
            }})
        .catch((error) => {
            console.log('algo salio mal', error);
        }
        );
    }
}
exports.module = {
    LyricFinder
}