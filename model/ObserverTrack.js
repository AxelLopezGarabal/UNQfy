const requestLog = require('./RequestLog')

class ObserverTrack{
    constructor(){
        this.log = new requestLog()
    }

    update(name, trackName){
        this.log.newTrack(name, trackName)
    }
}

module.exports = ObserverTrack