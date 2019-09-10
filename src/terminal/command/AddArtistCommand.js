const Command = require('./Command')

module.exports =
class AddArtistCommand extends Command {
    
    _excecute(unqfy, [name, country]) {
        unqfy.addArtist({name, country})
    }

    get name() { return 'addArtist' }

    get _argsDescription() {
        return [{ name: 'name'}, { name: 'country' }]
    }

}