
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
            uri: BASE_URL + '/matcher.lyrics.get',
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
            //var body = response.message.body;
            if (header.status_code !== 200){
                throw new Error('status code != 200');
            }
            var lyrics = (response.message.body.lyrics.lyrics_body)
            console.log(lyrics)
            return lyrics
        })
        .catch((error) => {
            console.log('algo salio mal', error);
        }
        );
    }
}
exports.module = {
    LyricFinder
}