const terminalCommandHandlers = require('./command_handlers/terminalCommandHandlers')
const defaultCommandHandlers  = Object.values(terminalCommandHandlers)

module.exports =
class Terminal {

    constructor(anUNQfy, commandHandlers=defaultCommandHandlers) {
        this._unqfy           = anUNQfy
        this._commandHandlers = commandHandlers
    }

    run(aCommand) {
        this
            .findCommandHandlerFor(aCommand)
            .handle(this._unqfy, aCommand)
    }

    findCommandHandlerFor(aCommand) {
        const aClass = this._commandHandlers.find(handler => handler.canHandle(aCommand))
        return new aClass(aCommand)
    }

}