const expect = require('chai').expect
const { User, Track, Playlist, Artist, Listening } = require('../model/entities/all')

describe('User', () => {
  const id   = 1
  const name = 'Pepe'

  beforeEach(() =>
    user = new User({id, name})
  )

  it('tiene un id', () => {
    expect(user.id).to.equal(id)
  })

  it('tiene un nombre', () => {
    expect(user.name).to.equal(name)
  })

  it('inicialmente no tiene registrada ninguna escucha', () => {
    expect(user.listenings).to.be.empty
  })

  it('registra las escuchas realizadas', () => {
    const track01 = makeTrack('track01')

    //const listening = user.listen(track01)
    const listening = makeListening()
    user.addToHistory(listening)
    
    //expect(listening.track).to.eql(track01)
    expect(user.listenings).to.be.lengthOf(1)
    expect(user.listenings).to.include.members([listening])
  })

  it('se le puede preguntas si escucho un track', () => {
    const track01 = makeTrack('track01')
    const track02 = makeTrack('track02')
    //user.listen(track01)
    user.addToHistory(makeListening(track01))
    
    expect(user.hasListened(track01)).to.be.true
    expect(user.hasListened(track02)).to.be.false
  })

  it('se le puede pedir los temas escuchados sin repetidos', () => {
    const track01 = makeTrack('track01')
    const track02 = makeTrack('track02')

    // user.listen(track01)
    // user.listen(track01)
    // user.listen(track02)
    // user.listen(track02)
    user.addToHistory(makeListening(track01))
    user.addToHistory(makeListening(track01))
    user.addToHistory(makeListening(track02))
    user.addToHistory(makeListening(track02))
  
    expect(user.listenedTracks).to.be.lengthOf(2)
    expect(user.listenedTracks).to.include.members([track01, track02])
  })

  it('se le puede consultar cuántas veces escuchó un tema', () =>{
    const track00 = makeTrack('track01')
    const track01 = makeTrack('track02')

    // user.listen(track01)
    // user.listen(track01)
    user.addToHistory(makeListening(track01))
    user.addToHistory(makeListening(track01))

    expect(user.timesListened(track00)).to.equal(0)
    expect(user.timesListened(track01)).to.equal(2)
  })

  it('se le puede pedir los temas mas escuchados', () =>{
    const track00 = makeTrack('track00')
    const track01 = makeTrack('track01')
    const track02 = makeTrack('track02')
    const track03 = makeTrack('track03')
    const track04 = makeTrack('track04')

    // user.listen(track01)
    // user.listen(track02)
    // user.listen(track02)
    // user.listen(track03)
    // user.listen(track03)
    // user.listen(track03)
    user.addToHistory(makeListening(track01))
    user.addToHistory(makeListening(track02))
    user.addToHistory(makeListening(track02))
    user.addToHistory(makeListening(track03))
    user.addToHistory(makeListening(track03))
    user.addToHistory(makeListening(track03))

    const losDosMasEscuchados = user.mostListenedTracks(2)
    expect(losDosMasEscuchados).to.have.lengthOf(2)
    expect(losDosMasEscuchados).to.include.members([track03, track02])

    const elMasEscuchado = user.mostListenedTracks(1)
    expect(elMasEscuchado).to.have.lengthOf(1)
    expect(elMasEscuchado).to.include(track03)
  })

  it('inicialmente no tiene ninguna playlist registrada', () => {
    expect(user.playlists).to.be.empty
  })

  it('puede registrar una playlist', () => {
    const aPlaylist = makePlaylist('playlist01')

    user.registerPlaylist(aPlaylist)
    
    expect(user.playlists).to.have.lengthOf(1)
    expect(user.playlists).to.include(aPlaylist)
  })

  it('puede eliminar una de sus playlist', () => {
    const playlist01 = makePlaylist('playlist01')
    const playlist02 = makePlaylist('playlist02')
    user.registerPlaylist(playlist01)
    user.registerPlaylist(playlist02)

    user.removePlaylist(playlist01)

    expect(user.playlists).to.have.lengthOf(1)
    expect(user.playlists).to.include(playlist02)
  })

  describe('Following', () => {
    it('inicialmente no siguie a nadie', () => {
      expect(user.followings).to.be.empty
    })

    it('puede seguir a un artista', () => {
      const artist = makeArtist('pepe')

      user.follow(artist)

      expect(user.followings).to.have.lengthOf(1)
      expect(user.followings).to.include(artist)
    })

    it('se le puede preguntar si esta siguiendo a alguien', () => {
      const artist = makeArtist('pepe')
      const artistNotFollowed = makeArtist('pepe')

      user.follow(artist)

      expect(user.isFollowing(artist)).to.be.true
      expect(user.isFollowing(artistNotFollowed)).to.be.false
    })

    it('si intenta siguir a un artista al que ya sigue, arroja una excepcion', () => {
      const artist = makeArtist('pepe')

      user.follow(artist)

      expect(() =>
        user.follow(artist)
      ).to.throw(`${user.name} ya esta siguiendo a ${artist.name}`)
    })

    it('cuando sigue a un artista, este lo registra como follower', () => {
      const artist = makeArtist('pepe')

      user.follow(artist)

      expect(artist.isFollowedBy(user)).to.be.true
    })
  })

  describe('Notificaciones', () => {
    it('inicialmente no tiene ninguna notificacion', () => {
      expect(user.notifications).to.be.empty
    })
    it('puede registrar notificaciones', () =>{
      const notification = makeNotification()
      user.addNotification(notification)
      expect(user.notifications).to.include(notification)
    })
  })
})

const makeArtist       = name  => new Artist(1, {name})
const makeTrack        = name  => new Track({id: 1, name, genres: ['aGenre'], duration: 100})
const makePlaylist     = name  => new Playlist(1, name, [])
const makeNotification = name  => ({})
const makeListening    = track => new Listening({track})