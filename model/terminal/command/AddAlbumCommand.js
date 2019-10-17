const Command = require('./Command')
const {
    naturalNumberArgumentDescription,
    alphanumericArgumentDescription
} = require('./arg_parser/argumentDescriptionsFactory')

module.exports =
class AddAlbumCommand extends Command {
    
    get name() {
        return 'addAlbum'
    }

    get _argsDescription() {
        return [
            naturalNumberArgumentDescription('artistId'),
            alphanumericArgumentDescription('name'),
            naturalNumberArgumentDescription('year')
        ]
    }

    _arrange([artistId, albumName, year]) {
        return [artistId, { name: albumName, year }]
    }

}