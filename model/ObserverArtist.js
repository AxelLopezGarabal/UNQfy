const requestLog = require('./RequestLog')

class ObserverArtist{
    constructor(){
        this.log = new requestLog()
    }

    update(name){
        this.log.newArtist(name)
    }
}

module.exports = ObserverArtist