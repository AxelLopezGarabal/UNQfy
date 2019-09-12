const Command = require('./Command')
const {
    nameArgumentParser,
    countryNameArgumentParser,
} = require('./arg_parser/argumentParsersFactory')

module.exports =
class AddArtistCommand extends Command {

    get name() {
        return 'addArtist'
    }

    get _argsDescription() {
        return [
            { name: 'name',    parser: nameArgumentParser },
            { name: 'country', parser: countryNameArgumentParser}
        ]
    }

    _arrange([name, country]) {
        return [{name, country}]
    }

}