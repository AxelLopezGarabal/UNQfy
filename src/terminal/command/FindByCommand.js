const Command = require('./Command')
const { alphanumericArgumentDescription } = require('./arg_parser/argumentDescriptionsFactory')

module.exports =
class FindByCommand extends Command {

    get name() {
        return 'findBy'
    }

    get _argsDescription() {
        return [
            alphanumericArgumentDescription('entity name'),
            alphanumericArgumentDescription('prop name'),
            alphanumericArgumentDescription('value')
        ]
    }

    _arrange([entityName, propName, valueName]) {
        return [entityName, {prop: propName, value: valueName}]
    }

}
