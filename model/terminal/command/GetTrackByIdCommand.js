const Command = require('./Command')
const { naturalNumberArgumentDescription } = require('./arg_parser/argumentDescriptionsFactory')

module.exports =
class GetTrackByIdCommand extends Command {

    get name() {
        return 'getTrackById'
    }

    get _argsDescription() {
        return [naturalNumberArgumentDescription('id')]
    }

}
