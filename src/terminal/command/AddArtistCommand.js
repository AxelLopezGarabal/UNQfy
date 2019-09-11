const Command = require('./Command')

module.exports =
class AddArtistCommand extends Command {

    get name() {
        return 'addArtist'
    }

    get _argsDescription() {
        return [{ name: 'name'}, { name: 'country' }]
    }

    _parse([name, country]) {
        return [{name, country}]
    }

}