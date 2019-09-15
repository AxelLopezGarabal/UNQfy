module.exports =
class RepeatedTrackInAlbum extends Error {

    constructor(aTrack, anAlbum) {
        super(`El track ${aTrack.name} ya forma parte del album ${anAlbum.name}`)
    }

}