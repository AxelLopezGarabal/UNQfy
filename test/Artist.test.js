const expect = require('chai').expect
const Album = require('../src/entities/Album.js')
const Artist = require('../src/entities/Artist.js')

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

    expect(artista.albums).to.include.members([album1, album2])
  })

  it('no puede registrar un mismo album mas de una vez', () => {
    const unAlbum = createAlbum('album1')
    artista.addAlbum(unAlbum)
    expect(
      () => artista.addAlbum(unAlbum)
    ).to.throw('No se puede registrar un mismo album mas de una vez')
  })

  it('sabe ti tiene es el autor de un album', () => {
    const album01 = createAlbum('album1')
    const album02 = createAlbum('album2')
    artista.addAlbum(album01)
    expect(artista.isTheAutorOf(album01)).to.be.true
    expect(artista.isTheAutorOf(album02)).to.be.false

  });

  it('se le puede pedir los tracks de todos sus albumes', () => {
    const track01 = createTrack()
    const track02 = createTrack()
    const album01 = createAlbum('album01', [track01])
    const album02 = createAlbum('album01', [track02])
    artista.addAlbum(album01)
    artista.addAlbum(album02)

    expect(artista.allTracks).to.have.lengthOf(2)
    expect(artista.allTracks).to.include.members([track01, track02])
  })

  it('puede eliminar un album', () => {
    const track01 = createTrack()
    const track02 = createTrack()
    const album01 = createAlbum('album01', [track01])
    const album02 = createAlbum('album01', [track02])
    artista.addAlbum(album01)
    artista.addAlbum(album02)
    
    artista.removeAlbum(album01)

    expect(artista.albums).to.have.lengthOf(1)
    expect(artista.albums).to.include(album02)
  })

  it('no puede eliminar un album que no tiene registrado', () => {
    const track = createTrack()
    const album = createAlbum('album', [track])
    
    expect(
      () => artista.removeAlbum(album)
    ).to.throw(`${artista.name} no tiene registrado el album ${album.name}`)
  })
  
})

const createAlbum = (name, tracks) => new Album({name, tracks})
const createTrack = () => ({})