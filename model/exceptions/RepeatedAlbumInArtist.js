module.exports =
class RepeatedAlbumInArtist extends Error {
    
    constructor(anArtist, anAlbum) {
        super(`${anArtist.name} ya tiene registrado el album ${anAlbum.name}`)
    }

}