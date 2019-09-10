module.exports =
class RepeatedAlbumInArtist extends Error {

    constructor(aTrack, anAlbum) {
        super(`El track ${aTrack.name} ya forma parte del album ${anAlbum.name}`)
    }

}