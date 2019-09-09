module.exports =
class Command {
    
    constructor(name, args) {
        this._name = name
        this._args = args
    }

    get name()         { return this._name }
    get args()         { return this._args }
    get numberOfArgs() { return this.args.length }

    numberOfArgsIs(aNumber)    { return this.numberOfArgs === aNumber }
    numberOfArgsIsNot(aNumber) { return !this.numberOfArgsIs(aNumber) }

}