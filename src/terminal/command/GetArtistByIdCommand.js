const Command = require('./Command')

module.exports =
class GetArtistByIdCommand extends Command {

    get name()             { return 'getArtistById' }
    get _argsDescription() { return [{ name: 'id'}] }

    _parse([id])           { return [parseInt(id)] }

}