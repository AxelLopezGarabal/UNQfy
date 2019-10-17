const expect = require('chai').expect
const { Listening, Track, User } = require('../model/entities/all')

describe('Listening', () => {
  const track    = {}
  const album    = {}
  const artist   = {}
  const listener = {}

  beforeEach(() =>
    listening = new Listening({listener, artist, album, track})
  )

  it('conoce al que realizo la escucha', () =>
    expect(listening.listener).to.equal(listener)
  )

  it('conoce al artista', () =>
    expect(listening.artist).to.equal(artist)
  )

  it('conoce al album', () =>
    expect(listening.album).to.equal(album)
  )

  it('conoce el track escuchado', () =>
    expect(listening.track).to.eql(track)
  )

})