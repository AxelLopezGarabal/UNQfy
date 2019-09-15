const expect = require('chai').expect

const { Artist, Album, User, Listening } = require('../src/entities/all.js')

const { RepeatedTrackInAlbum } = require('../src/exceptions/all')

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
    const album2 = createAlbum('album2')

    artista.addAlbum(album1)
    artista.addAlbum(album2)

    expect(artista.albums).to.include.members([album1, album2])
  })

  it('no puede registrar un mismo album mas de una vez', () => {
    const unAlbum = createAlbum('album1')
    artista.addAlbum(unAlbum)
    expect(
      () => artista.addAlbum(unAlbum)
    ).to.throw(`${artista.name} ya tiene registrado el album ${unAlbum.name}`)
  })

  it('sabe ti tiene es el autor de un album', () => {
    const album01 = createAlbum('album1')
    const album02 = createAlbum('album2')
    artista.addAlbum(album01)
    expect(artista.isTheAuthorOfAlbum(album01)).to.be.true
    expect(artista.isTheAuthorOfAlbum(album02)).to.be.false

  });

  it('se le puede pedir los tracks de todos sus albumes', () => {
    const track01 = createTrack()
    const track02 = createTrack()
    const album01 = createAlbum('album01', [track01])
    const album02 = createAlbum('album02', [track02])
    artista.addAlbum(album01)
    artista.addAlbum(album02)

    expect(artista.allTracks).to.have.lengthOf(2)
    expect(artista.allTracks).to.include.members([track01, track02])
  })

  it('puede eliminar un album', () => {
    const track01 = createTrack()
    const track02 = createTrack()
    const album01 = createAlbum('album01', [track01])
    const album02 = createAlbum('album02', [track02])
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

  it('puede eliminar un track', () => {
    const track01 = createTrack()
    const track02 = createTrack()
    const album01 = createAlbum('album01', [track01])
    const album02 = createAlbum('album02', [track02])
    artista.addAlbum(album01)
    artista.addAlbum(album02)
    
    artista.removeTrack(track01)

    expect(artista.allTracks).to.have.lengthOf(1)
    expect(artista.allTracks).not.to.include(track01)
  })

  describe('Busqueda de album', () => {
    it('puede buscar un album por nombre', () => {
      const album = createAlbum('album name', [])
      artista.addAlbum(album)
      expect(artista.findAlbumByName(album.name)).to.equal(album)
    })

    it('puede buscar un album por id', () => {
      const album = createAlbum('album name', [])
      artista.addAlbum(album)
      expect(artista.findAlbumById(album.id)).to.equal(album)
    })

    it('si no tiene un album solicitado arroja un excepcion', () => {      
      expect(() => artista.findAlbumByName('adasdasdasdasdasd')).to.throw('album not found')
      expect(() => artista.findAlbumById('adasdasdasdasdasd')).to.throw('album not found')
    })
  })

  describe('Add track to album', () => {
    it('puede agregarle un track a uno de sus albums', () => {
      const album01 = createAlbum('album01', [])
      const track01 = createTrack()

      artista.addAlbum(album01)
      artista.addTrackTo(album01, track01)

      expect(album01.hasTrack(track01))
    })

    it('no puede agregarle tracks a un album del que no es autor', () => {
      const album01 = createAlbum('album01', [])
      const track01 = createTrack()

      expect(() =>
        artista.addTrackTo(album01, track01))
      .to.throw(`${artista.name} no tiene registrado el album ${album01.name}`)
    })
  })

  describe('Seguidores', () => {
    it('inicialmente no tiene seguidores', () => {
      expect(artista.followers).to.be.empty
    })

    it('puede registrar seguidores', () => {
      const follower = createFollower('pepe')
      artista.addFollower(follower)
      expect(artista.followers).to.have.lengthOf(1)
      expect(artista.followers).to.include(follower)
    })

    it('se le puede preguntar si es seguido por alguien', () => {
      const follower    = createFollower('pepe')
      const notFollower = createFollower('juan')
      artista.addFollower(follower)
      expect(artista.isFollowedBy(follower)).to.be.true
      expect(artista.isFollowedBy(notFollower)).to.be.false
    })

    it('los followers se registran una sola vez', () => {
      const follower = createFollower('pepe')
      artista.addFollower(follower)
      expect(() =>
        artista.addFollower(follower))
      .to.throw(`${artista.name} ya tiene registrado como follower a ${follower.name}`)
    })
  })

  describe('Emision de notificaciones', () =>{
    it('Cuando publica un album notifica a sus seguidores', () => {
      const follower = createFollower('followeName')
      const album01  = createAlbum('album01', [])
      
      follower.follow(artista)
      // artista.addFollower(follower)
      artista.addAlbum(album01)

      expect(follower.notifications).to.have.lengthOf(1)
      expect(follower.notifications[0].artist).to.equal(artista)
      expect(follower.notifications[0].album).to.equal(album01)
    })

    it('Cuando publica un track notifica a sus seguidores', () => {
      const follower = createFollower('followeName')
      const album01  = createAlbum('album01', [])
      const track01  = createTrack('trackName')
      artista.addAlbum(album01)
      follower.follow(artista)
      
      // artista.addFollower(follower)
      artista.addTrackTo(album01, track01)      

      expect(follower.notifications).to.have.lengthOf(1)
      expect(follower.notifications[0].artist).to.equal(artista)
      expect(follower.notifications[0].album).to.equal(album01)
      expect(follower.notifications[0].track).to.equal(track01)
    })
  })

  describe('Recepcion de notifiaciones', () => {
    it('puede registrar escuchas realizadas por otros de sus tracks', () => {
      const listener  = createFollower('followeName')
      const album     = createAlbum('album01', [])
      const track     = createTrack('trackName')
      const listening = new Listening({listener, artist: artista, album, track})

      artista.registerOthersListeningsOfHisArt(listening)

      expect(artista.othersListeningsOfHisArt).to.have.lengthOf(1)
      expect(artista.othersListeningsOfHisArt[0]).to.equal(listening)
    })
  })

})

const createAlbum    = (name, tracks) => new Album({id: 0, name, tracks})
const createFollower = name => new User({id: 0, name})
const createTrack    = () => ({})