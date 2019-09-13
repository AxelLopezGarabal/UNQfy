module.exports =
class NullCommand {

    constructor(commandName) {
        this._commandName = commandName
    }

    handle(unqfy, args) {
        throw Error(`Could not find command "${this._commandName}"`)
    }

}