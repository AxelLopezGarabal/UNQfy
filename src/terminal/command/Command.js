module.exports =
class Command {
    
    handle(unqfy, args) {
        this._validate(args)
        return this._excecute(unqfy, args)
    }
    
    _validate(args) {
    if (!this._isCorrectNumberOfArgs(args)) // TODO: check arg type
        throw `ERROR: should pass ${this._expectedNumberOfArgs} args as follow => ${this._argsNames}`
    }

    _excecute(unqfy, args) { throw 'Subclass responsability' }
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