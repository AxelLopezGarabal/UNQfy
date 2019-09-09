const {
    AddArtistCommandHandler,
    AddAlbumCommandHandler,
    AddTrackCommandHandler
} = require('./command_handlers/terminalCommandHandlers')

class Terminal {

    constructor(anUNQfy) {
        this._unqfy = anUNQfy
    }

    run(aCommand) {
        this
            .findCommandHandlerFor(aCommand)
            .handle(this._unqfy, aCommand)
    }

    findCommandHandlerFor(aCommand) {
        const aClass = this._commandHandlers.find(handler => {
            console.log("handler ->", handler.canHandle(aCommand))
            return handler.canHandle(aCommand)
        })
        console.log(aClass)
        return new aClass(aCommand)
    }
    
    get _commandHandlers() {
        return [
            AddArtistCommandHandler,
            AddAlbumCommandHandler,
            AddTrackCommandHandler
        ]
    }
}

module.exports = Terminal