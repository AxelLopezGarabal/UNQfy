class Track {

  constructor(dataObject) {
    if (!dataObject) return // Hubo que hacer esto por culpa del framework de persistencia
    const { id, name, duration, genres } = dataObject
    this._id       = id
    this._name     = name
    this._duration = duration
    this._genres   = genres
  }

  toJSON() { // TODO: no tiene test
    return {
      id: this.id,
      name: this.name,
      duration: this.duration,
      genres: this.genres
    }
  }

  // Queries
  get id()       { return this._id }
  get name()     { return this._name }
  get duration() { return this._duration }
  get genres()   { return this._genres }

  set name(newName) { this._name = newName }

  // Testing
  matchGenre(aGenre) {
    return this.genres.includes(aGenre)
  }

  matchSomeGenreFrom(genres) {
    return genres.some(aGenre => this.matchGenre(aGenre))
  }

}

module.exports = Track