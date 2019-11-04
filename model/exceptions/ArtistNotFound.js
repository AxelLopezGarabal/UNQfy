module.exports =
class ArtistNotFound extends Error {

    constructor(name) {
        super(`Error: Could not find "artist" with "name" equal to "`+name+`"`)
        this.name = 'ArtistNotFound'
    }

}