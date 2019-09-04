const expect = require('chai').expect
const Album = require('../src/Album.js')
const Artist = require('../src/Artist.js')

describe('Artist', () => {
  let id      = 123
  let name    = "Pepe Apellido"
  let country = "Felicidonia"

  let artista

  beforeEach(() => {
    artista = new Artist({id, name, country})
  })

  it('tiene un "id"',       () => expect(artista.id).to.equal(id))
  it('tiene un nombre',     () => expect(artista.name).to.equal(name) )
  it('sabe de que pais es', () => expect(artista.country).to.equal(country) )

  it('inicialmente no tiene ningun album publicado', () =>
    expect(artista.albums).to.be.empty)

  it('puede registrar albumes', () => {
    const album1 = createAlbum('album1')
    const album2 = createAlbum('album1')

    artista.addAlbum(album1)
    artista.addAlbum(album2)

    expect(artista.albums).to.include(album1)
    expect(artista.albums).to.include(album2)
  })

  it('no puede registrar un mismo album mas de una vez', () => {
    const unAlbum = createAlbum('album1')
    artista.addAlbum(unAlbum)
    expect(
      () => artista.addAlbum(unAlbum)
    ).to.throw('No se puede registrar un mismo album mas de una vez')
  })

  it('se le puede pedir los tracks de todos sus albumes', () => {
    const track01 = createTrack()
    const track02 = createTrack()
    const album01 = createAlbum('album01', [track01])
    const album02 = createAlbum('album01', [track02])
    artista.addAlbum(album01)
    artista.addAlbum(album02)

    expect(artista.allTracks.length).to.equal(2)
    expect(artista.allTracks).to.include(track01)
    expect(artista.allTracks).to.include(track02)
  })
  
})

const createAlbum = (name, tracks) => new Album({name, tracks})
const createTrack = () => ({})