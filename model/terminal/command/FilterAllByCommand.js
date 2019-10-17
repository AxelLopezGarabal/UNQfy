const Command = require('./Command')
const { alphanumericArgumentDescription } = require('./arg_parser/argumentDescriptionsFactory')

module.exports =
class FilterAllByCommand extends Command {

    get name() {
        return 'filterAllBy'
    }

    get _argsDescription() {
        return [
            alphanumericArgumentDescription('prop name'),
            alphanumericArgumentDescription('value')
        ]
    }

    _arrange([propName, valueName]) {
        return [{prop: propName, value: valueName}]
    }

}
