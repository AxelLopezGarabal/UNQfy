module.exports =
class ArtistaYaExiste extends Error {

    constructor(artistName) {
        super(`Ya existe un artista registrado con el nombre ${artistName}`)
        this.name = 'ArtistaYaExiste'
    }

}