module.exports =
class IncorrectNumbersOfArgsForCommand extends Error {

    constructor(aCommand) {
        super(`ERROR: should pass ${aCommand._expectedNumberOfArgs} args as follow => ${aCommand._argsNames}`)
    }

}