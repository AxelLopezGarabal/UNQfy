module.exports =
class SomeoneAlreadyRegisterUnderName extends Error {

    constructor(artistName) {
        super(`Alguien ya esta registrado con el nombre ${artistName}`)
        this.name = 'SomeoneAlreadyRegisterUnderName'
    }

}