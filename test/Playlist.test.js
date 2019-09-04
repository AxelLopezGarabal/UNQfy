const expect   = require('chai').expect
const Track    = require('../src/Track.js')
const Album    = require('../src/Album.js')
const Playlist = require('../src/Playlist.js')

describe('Playlist', ()=> {
  const id   = 123
  const name = "album name"
  
  let playlist

  beforeEach(() => {
    playlist = new Playlist({ id, name })
  })

  it('tiene un id',     () => expect(playlist.id).to.equal(id))
  it('tiene un nombre', () => expect(playlist.name).to.equal(name))

  it('inicialmente no tiene ningun track', () => expect(playlist.tracks).to.be.empty)

  it('se le pueden agregar tracks', () => {
    const track01 = createTrack('track01')
    playlist.addTrack(track01)
    expect(playlist.tracks).to.include(track01)
  })

  it('puede tener tracks repetidos', () => {
    const track01 = createTrack('track01')
    playlist.addTrack(track01)
    playlist.addTrack(track01)

    expect(playlist.tracks.length).to.equal(2)
    expect(playlist.tracks).to.include(track01)
  })
  
})

const createTrack = name => new Track({ name })