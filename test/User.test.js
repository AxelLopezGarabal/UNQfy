const expect = require('chai').expect
const { User, Track } = require('../src/entities/all')

describe('User', () => {
  const id   = 1
  const name = 'Pepe'

  beforeEach(() =>
    user = new User(id, name)
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

    const listening = user.listen(track01)
    
    expect(listening.track).to.eql(track01)
    expect(user.listenings).to.be.lengthOf(1)
    expect(user.listenings).to.include.members([listening])
    
  })

  it('se le puede preguntas si escucho un track', () => {
    const track01 = makeTrack('track01')
    const track02 = makeTrack('track02')
    user.listen(track01)
    
    expect(user.hasListened(track01)).to.be.true
    expect(user.hasListened(track02)).to.be.false
  })

  it('se le puede pedir que escuche varios temas', () => {
    const track01 = makeTrack('track01')
    const track02 = makeTrack('track02')
    user.listenAll([track01, track02])
    
    expect(user.hasListened(track01)).to.be.true
    expect(user.hasListened(track02)).to.be.true
  })

  it('se le puede pedir los temas escuchados sin repetidos', () => {
    const track01 = makeTrack('track01')
    const track02 = makeTrack('track02')

    user.listen(track01)
    user.listen(track01)
    user.listen(track02)
    user.listen(track02)
  
    expect(user.listenedTracks).to.be.lengthOf(2)
    expect(user.listenedTracks).to.include.members([track01, track02])
  })

  it('se le puede consultar cuántas veces escuchó un tema', () =>{
    const track00 = makeTrack('track01')
    const track01 = makeTrack('track02')

    user.listen(track01)
    user.listen(track01)

    expect(user.timesListened(track00)).to.equal(0)
    expect(user.timesListened(track01)).to.equal(2)
  })

  it('se le puede pedir los temas mas escuchados', () =>{
    const track00 = makeTrack('track00')
    const track01 = makeTrack('track01')
    const track02 = makeTrack('track02')
    const track03 = makeTrack('track03')
    const track04 = makeTrack('track04')

    user.listen(track01)
    user.listen(track02)
    user.listen(track02)
    user.listen(track03)
    user.listen(track03)
    user.listen(track03)

    const losDosMasEscuchados = user.mostListenedTracks(2)
    expect(losDosMasEscuchados).to.have.lengthOf(2)
    expect(losDosMasEscuchados).to.include.members([track03, track02])

    const elMasEscuchado = user.mostListenedTracks(1)
    expect(elMasEscuchado).to.have.lengthOf(1)
    expect(elMasEscuchado).to.include(track03)
  })

})

const makeTrack = name => new Track({id: 1, name, genres: ['aGenre'], duration: 100})