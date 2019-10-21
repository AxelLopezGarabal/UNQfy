const expect = require('chai').expect
const Track  = require('../model/entities/Track.js')

describe('Track', () => {
  const id       = 1
  const name     = 'nombre track 01'
  const duration = 10000
  const genres   = ['Punk', 'Folklore']

  let track01

  beforeEach(() => {
    track01 = new Track({ id, name, duration, genres })
  })

  it('tiene un id',        () => expect(track01.id).to.equal(id))
  it('tiene un nombre',    () => expect(track01.name).to.equal(name))
  it('conoce su duracion', () => expect(track01.duration).to.equal(duration))

  it('esta asociado a generos musicales', () => {
    // TODO: includes all o algo por el estilo
    expect(track01.genres.length).to.equal(2) 
    expect(track01.genres).to.include('Punk') 
    expect(track01.genres).to.include('Folklore')
  })

  it('sabe si pertenece a un genero', () => {
    expect(track01.matchGenre('Punk')).to.equal(true)
    expect(track01.matchGenre('Balada')).to.equal(false)
  })

  it('sabe si pertenece a algun genero de una lista', () => {
    expect(track01.matchSomeGenreFrom(['Ccasd', 'Punk'])).to.equal(true)
    expect(track01.matchSomeGenreFrom(['Ccasd', '123123'])).to.equal(false)
    expect(track01.matchSomeGenreFrom([])).to.equal(false)
  })

  // VISADO 2
  it('se le puede asignar un proveedor de letras', () => {
    const lyrics = 'la la la la la'
    const lyricsProvider = { find: () => lyrics }

    const track = new Track({ id, name, duration, genres })
    track.lyricsProvider = lyricsProvider

    expect(track.lyrics).to.equal(lyrics)
  })

  it('si no se le asigna un proveedor de letras retorna un string vacio', () => {
    const track = new Track({ id, name, duration, genres })
    expect(track.lyrics).to.equal('')
  })
})