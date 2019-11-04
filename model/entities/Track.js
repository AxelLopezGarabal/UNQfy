const nullLyricsProvider = { find: () => '' }

class Track {

  constructor(dataObject) {
    if (!dataObject) return // Hubo que hacer esto por culpa del framework de persistencia
    const { id, name, duration, genres, lyricsProvider} = dataObject
    this._id       = id
    this._name     = name
    this._duration = duration
    this._genres   = genres
    this._lyrics   = ''
    
    this._lyricsProvider = lyricsProvider
  }

  toJSON() { // TODO: no tiene test
    return {
      id: this.id,
      name: this.name,
      duration: this.duration,
      genres: this.genres,
      lyrics: this.lyrics
    }
  }

  // Queries
  get id()       { return this._id }
  get name()     { return this._name }
  get duration() { return this._duration }
  get genres()   { return this._genres } 
  get lyrics()   { return this._lyrics } 

  set name(newName) { this._name = newName }

  getLyrics(){
    if (this._lyrics === ''){
      (this._lyricsProvider.getLyrics(this)).then(lyric=> this._lyrics = lyric);
      console.log(this)
    }
    return this._lyrics } 
  
  set lyricsProvider(aLyricsProvider) { this._lyricsProvider = aLyricsProvider }

  // Testing
  matchGenre(aGenre) {
    return this.genres.includes(aGenre)
  }

  matchSomeGenreFrom(genres) {
    return genres.some(aGenre => this.matchGenre(aGenre))
  }

}

module.exports = Track