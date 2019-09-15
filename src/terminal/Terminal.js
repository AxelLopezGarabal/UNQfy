const commandsModule = require('./command/all')
const NullCommand    = require('./command/NullCommand')

const defaultCommands = Object.values(commandsModule).map(aClass => new aClass())
const defaultResultHandler = result => console.log(result)
const defaultErrorHandler  = error  => console.log(error.message)

module.exports =
class Terminal {

    constructor({unqfy, commands=defaultCommands, resultHandler=defaultResultHandler, errorHandler=defaultErrorHandler})
    {
        this._unqfy         = unqfy
        this._commands      = commands
        this._resultHandler = resultHandler
        this._errorHandler  = errorHandler
    }

    run(commandName, args) {
        let returnedValue
        try {
            returnedValue = this.findCommand(commandName).handle(this._unqfy, args)
        } catch(anError) {
            return this._errorHandler(anError)
        }
        this._resultHandler({command: [commandName, ...args].join(' '), returned: returnedValue || 'nothing' })
    }

    findCommand(commandName) {
        return this._commands.find(aCommand => aCommand.name === commandName) || new NullCommand(commandName)
    }

}