module.exports =
class ArtistNotFound extends Error {

    constructor(artistId) {
        super(`No existe ningun usuario con el id ${artistId}`)
    }

}