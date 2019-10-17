const Command = require('./Command')
const { alphanumericArgumentDescription } = require('./arg_parser/argumentDescriptionsFactory')

module.exports =
class SearchByNamePartial extends Command {

    get name() {
        return 'searchByNamePartial'
    }

    get _argsDescription() {
        return [alphanumericArgumentDescription('name')]
    }

}
