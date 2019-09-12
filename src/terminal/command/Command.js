const { IncorrectNumbersOfArgsForCommand } = require('../../exceptions/all')

module.exports =
class Command {
    
    handle(unqfy, args) {
        this._validate(args)
        return this._excecute(unqfy, args)
    }
    
    _validate(args) {
    if (!this._isCorrectNumberOfArgs(args)) // TODO: check arg type
        throw new IncorrectNumbersOfArgsForCommand(this)
    }

    _excecute(unqfy, args) {
		return unqfy[this.name](...this._arrange(this._parse(args)))
    }
    
    _arrange(args) {
        return [...args]
    }
    
    _parse(argsToParse) {
        return this._argsDescription.map((argDescription, index) =>
            argDescription.parser(argDescription.name).parse(argsToParse[index]))
    }

    //_parse(args)           { throw 'Subclass responsability' }
    get name()             { throw 'Subclass responsability' }
    get _argsDescription() { throw 'Subclass responsability' }

    get _expectedNumberOfArgs() {
        return this._argsDescription.length
    }

    get _argsNames() {
        return this._argsDescription.map(arg => arg.name)
    }

    _isCorrectNumberOfArgs(args) {
        return args.length === this._expectedNumberOfArgs
    }

}