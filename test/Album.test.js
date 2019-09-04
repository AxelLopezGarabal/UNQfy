const expect = require('chai').expect
const Track  = require('../src/Track.js')
const Album  = require('../src/Album.js')

describe('Album', () => {
  const id   = 123
  const name = "album name"
  const year = 2000
  
  let album

  beforeEach(() => {
    album = new Album({id, name, year})
  })

  it('tiene un id',     () => expect(album.id).to.equal(id))
  it('tiene un nombre', () => expect(album.name).to.equal(name))

  it('sabe en que año fue publicado', () => expect(album.year).to.equal(year))
  
  it('inicialmente no tiene ningun track', () =>
    expect(album.tracks).to.be.empty
  )

  it('se le pueden agregar tracks', () => {
    const aTrack = createTrackNamed('track01')   
    album.addTrack(aTrack)
    expect(album.tracks).to.include(aTrack)
  })

  it('no puede tener tracks repetidos', () => {
    const aTrack = createTrackNamed('track01')   
    album.addTrack(aTrack)
    
    expect(() =>
      album.addTrack(aTrack)
    ).to.throw(`El track ${aTrack.name} ya forma parte del album`)
  })

})

function createTrackNamed(aName) {
  return new Track(1, aName, 1000, [])
}