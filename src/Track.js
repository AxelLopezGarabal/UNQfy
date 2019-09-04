class Track {

  constructor({ id, name, duration, genres }) {
    this._id       = id
    this._name     = name
    this._duration = duration
    this._genres   = genres
  }

  // Queries
  get id()       { return this._id }
  get name()     { return this._name }
  get duration() { return this._duration }
  get genres()   { return this._genres }

  // Testing
  matchGenre(aGenre) {
    return this.genres.includes(aGenre)
  }

  matchSomeGenreFrom(genres) {
    return genres.some(aGenre => this.matchGenre(aGenre))
  }

}

module.exports = Track