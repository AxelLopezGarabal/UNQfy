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
        return [{ name: 'name'}, { name: 'country' }]
    }

    _parse([name, country]) {
        return [{
            name: nameArgumentParser('name').parse(name),
            country: countryNameArgumentParser('country').parse(country)
        }]
    }

}