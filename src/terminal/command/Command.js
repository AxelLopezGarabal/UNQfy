const { IncorrectNumbersOfArgsForCommand } = require('../../exceptions/all')

module.exports =
class Command {
    
    handle(unqfy, args) {
        this._validate(args)
        return this._excecute(unqfy, args)
    }
    
    _validate(args) {
    if (!this._hasCorrectNumberOfArgs(args))
        throw new IncorrectNumbersOfArgsForCommand(this)
    }

    _excecute(unqfy, args) {
        return args.length === 0
                ? unqfy[this.name]
                : unqfy[this.name](...this._arrange(this._parse(args)))
    }
    
    _parse(argsToParse) {
        return this._argsDescription.map((argDescription, index) => argDescription.parse(argsToParse[index]))
    }

    _arrange(args) { // Hook method
        return [...args]
    }

    get name()             { throw 'Subclass responsability' }
    get _argsDescription() { throw 'Subclass responsability' }

    get _expectedNumberOfArgs() {
        return this._argsDescription.length
    }

    get _argsNames() {
        return this._argsDescription.map(arg => arg.name)
    }

    _hasCorrectNumberOfArgs(args) {
        return args.length === this._expectedNumberOfArgs
    }

}