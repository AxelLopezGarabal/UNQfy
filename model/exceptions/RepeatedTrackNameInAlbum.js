module.exports =
class RepeatedTrackNameInAlbum extends Error {

  constructor(aTrack, anAlbum) {
    super(`Ya existe un track llamado "${aTrack.name}" en el album "${anAlbum.name}"`)
    this.name = 'RepeatedTrackNameInAlbum'
  }

}
