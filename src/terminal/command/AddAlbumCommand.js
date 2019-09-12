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
        return [
            { name: 'artistId', parser: naturalNumberArgumentParser},
            { name: 'name',     parser: nameArgumentParser },
            { name: 'year',     parser: naturalNumberArgumentParser}
        ]
    }

    _arrange([artistId, albumName, year]) {
        return [artistId, { name: albumName, year }]
    }

}