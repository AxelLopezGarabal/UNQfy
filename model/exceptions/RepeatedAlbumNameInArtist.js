module.exports =
class RepeatedAlbumNameInArtist extends Error {

  constructor(anArtist, anAlbum) {
    super(`El artista "${anArtist.name}" ya tiene publicado un album llamado "${anAlbum.name}"`)
  }

}
