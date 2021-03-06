const expect = require('chai').expect
const Track  = require('../model/entities/Track.js')
const Album  = require('../model/entities/Album.js')

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

  it('se le pueden quitar tracks', () => {
    const aTrack = createTrackNamed('track01')
    album.addTrack(aTrack)
    album.removeTrack(aTrack)
    expect(album.tracks).to.be.empty
  })

  it('sabe si tiene un track', () => {
    const track01 = createTrackNamed('track01')
    const track02 = createTrackNamed('track02')

    album.addTrack(track01)

    expect(album.hasTrack(track01)).to.be.true
    expect(album.hasTrack(track02)).to.be.false
  })

  it('no puede tener 2 tracks distintos que se llamen igual', () => {
    const track01     = createTrackNamed('track01')
    const otroTrack01 = createTrackNamed('track01')

    album.addTrack(track01)

    expect(() => {
      album.addTrack(otroTrack01)
    }).to.throw(`Ya existe un track llamado "${track01.name}" en el album "${album.name}"`)
  })

  describe('Actualizacion', () => {
    it('se le puede actualizar el año', () => {
      const oldYear = album.year
      const newYear = oldYear + 1

      album.update({year: newYear })

      expect(album.year).to.eq(newYear)
    })
  })

})

function createTrackNamed(aName) {
  return new Track(1, aName, 1000, [])
}