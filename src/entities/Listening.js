module.exports =
class Listening {

  constructor({listener, artist, album, track}) {
    this._listener = listener
    this._artist   = artist
    this._album    = album
    this._track    = track
  }

  get listener() { return this._listener }
  get artist()   { return this._artist   }
  get album()    { return this._album    }
  get track()    { return this._track    }

}