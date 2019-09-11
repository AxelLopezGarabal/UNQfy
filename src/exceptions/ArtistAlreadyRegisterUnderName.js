module.exports =
class ArtistAlreadyRegisterUnderName extends Error {

    constructor(artistName) {
        super(`Ya esta registrado un artista llamado ${artistName}`)
    }

}