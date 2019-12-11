const requestLog = require('./RequestLog');
const requestNotify = require('./RequestNotification');

class ObserverAlbum{
    constructor(){
        this.log = new requestLog()
        this.notification = new requestNotify()
    }

    update(id, name, albumName){
        this.log.newAlbum(name, albumName)
        this.notification.newAlbum(id, name, albumName)
    }
}

module.exports = ObserverAlbum