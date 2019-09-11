const Command = require('./Command')
const {
    naturalNumberArgumentParser,
    nameArgumentParser
} = require('./arg_parser/argumentParsersFactory')

module.exports =
class AddAlbumCommand extends Command {
    
    get name() {
        return 'addAlbum'
    }

    get _argsDescription() {
        return [{ name: 'artist id'}, { name: 'name' }, { name: 'year' }]
    }

    _parse([artistId, albumName, year]) {
        return [
            naturalNumberArgumentParser('artistId').parse(artistId),
            {
                name: nameArgumentParser('name').parse(albumName),
                year: naturalNumberArgumentParser('year').parse(year)
            }
        ]
    }

}