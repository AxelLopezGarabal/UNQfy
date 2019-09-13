const Command = require('./Command')
const {
    nameArgumentDescription,
    countryNameArgumentDescription,
} = require('./arg_parser/argumentDescriptionsFactory')

module.exports =
class AddArtistCommand extends Command {

    get name() {
        return 'addArtist'
    }

    get _argsDescription() {
        return [
            nameArgumentDescription('name'),
            countryNameArgumentDescription('country')
        ]
    }

    _arrange([name, country]) {
        return [{name, country}]
    }

}