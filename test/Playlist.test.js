const expect   = require('chai').expect
const Track    = require('../model/entities/Track.js')
const Album    = require('../model/entities/Album.js')
const Playlist = require('../model/entities/Playlist.js')

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

  it('se le puede agregar de a un track', () => {
    const track01 = createTrack('track01')
    playlist.addTrack(track01)
    expect(playlist.tracks).to.include(track01)
  })

  it('se le puede agregar de a varios tracks', () => {
    const track01 = createTrack('track01')
    const track02 = createTrack('track02')
    playlist.addAllTracks([track01, track02])
    
    expect(playlist.tracks).to.have.lengthOf(2)
    expect(playlist.tracks).to.have.members([track01, track02])
  })

  it('puede tener tracks repetidos', () => {
    const track01 = createTrack('track01')
    playlist.addTrack(track01)
    playlist.addTrack(track01)

    expect(playlist.tracks).to.have.lengthOf(2)
    expect(playlist.tracks).to.include(track01)
  })

  it('se le puede preguntar si tiene un track', () => {
    const track01 = createTrack('track01')
    const track02 = createTrack('track02')

    playlist.addTrack(track01)

    expect(playlist.hasTrack(track01)).to.be.true
    expect(playlist.hasTrack(track02)).to.be.false
  })

  it('su duracion es igual a la suma de lo que dure cada track', () => {
    const track01 = createTrack('track01', 100)
    const track02 = createTrack('track02', 200)
    
    playlist.addTrack(track01)
    playlist.addTrack(track02)
  
    expect(playlist.duration()).to.equal(track01.duration + track02.duration)
  })

  it('puede remover un track', () => {
    const track01 = createTrack('track01', 100)
    const track02 = createTrack('track02', 200)
    
    playlist.addTrack(track01)
    playlist.addTrack(track02)

    playlist.removeTrack(track02)

    expect(playlist.tracks).to.have.lengthOf(1)
    expect(playlist.tracks).to.include(track01)
  })

  it('puede remover varios tracks', () => {
    const track01 = createTrack('track01', 100)
    const track02 = createTrack('track02', 200)
    const track03 = createTrack('track03', 300)
    
    playlist.addTrack(track01)
    playlist.addTrack(track02)
    playlist.addTrack(track03)

    playlist.removeAll([track01, track02])

    expect(playlist.tracks).to.have.lengthOf(1)
    expect(playlist.tracks).to.include(track03)
  })
  
})

const createTrack = (name, duration=1) => new Track({ name, duration })