
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

class LyricFinder{
    constructor(){
    }
    getLyrics(trackName, artistName, track){
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
            if (header.status_code !== 200){
                throw new Error('status code != 200');
            }
            var lyrics = (response.message.body.lyrics.lyrics_body)
            return lyrics
        })
        .then(res => {
            track.setLyrics(res)
            return track
        })
        .then(result=> {
            console.log(result)
        })
        .catch((error) => {
            console.log(error);
        }
        );
    }
}
exports.module = {
    LyricFinder
}