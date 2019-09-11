const commandsModule = require('./command/all')

const defaultCommands = Object.values(commandsModule).map(aClass => new aClass())
const defaultResultHandler = result => console.log(result)
const defaultErrorHandler  = error  => console.log(error.message)

module.exports =
class Terminal {

    constructor(
        anUNQfy,
        commands= defaultCommands,
        resultHandler=defaultResultHandler,
        errorHandler=defaultErrorHandler)
    {
        this._unqfy         = anUNQfy
        this._commands      = commands
        this._resultHandler = resultHandler
        this._errorHandler  = errorHandler
    }

    run(commandName, args) {
        let returnedValue
        const command = this.findCommand(commandName)
        if (command == null) throw 'command not found'

        try {
            returnedValue = this.findCommand(commandName).handle(this._unqfy, args)
        } catch(anError) {
            this._errorHandler(anError)
        }
        this._resultHandler({command: [commandName, ...args].join(' '), returned: returnedValue || 'nothing' })
        return returnedValue
    }

    findCommand(commandName) {
        return this._commands.find(aCommand => aCommand.name === commandName)
    }

}