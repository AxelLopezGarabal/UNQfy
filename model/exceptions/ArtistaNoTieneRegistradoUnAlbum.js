module.exports =
class ArtistaNoTieneRegistradoUnAlbum extends Error {

    constructor(anArtist, anAlbum) {
        super(`${anArtist.name} no tiene registrado el album ${anAlbum.name}`)
        this.name = 'ArtistaNoTieneRegistradoUnAlbum'
    }

}