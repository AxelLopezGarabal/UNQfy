const Command = require('./Command')

module.exports =
class GetArtistByIdCommand extends Command {
    
    _excecute(unqfy, [id]) {
        return unqfy.getArtistById(id)
    }

    get name() { return 'getArtistById' }

    get _argsDescription() {
        return [{ name: 'id'}]
    }

}