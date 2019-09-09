const expect = require('chai').expect

const { UNQfy } = require('../../src/unqfy')

const Command = require('../../src/terminal/command/Command')

const {
  AddArtistCommandHandler,
  AddAlbumCommandHandler,
  AddTrackCommandHandler
} = require('../../src/terminal/command_handlers/terminalCommandHandlers')

describe('AddArtistCommandHandler', () => {
  let handler
  let unqfy

  const artistName  = 'artistName'
  const countryName = 'country name'
  
  beforeEach(() => {
    unqfy   = new UNQfy()
    handler = new AddArtistCommandHandler()
  })

  it('correct arguments', () => {
    handler.handle(unqfy, new Command('', [artistName, countryName]))

    const anArtist = unqfy.getArtistByName(artistName)

    expect(anArtist.name).to.equal(artistName)
    expect(anArtist.country).to.equal(countryName)
  })

  it('sobran argumentos', () => {
    expect(() =>
      handler.handle(unqfy, new Command('', [artistName, countryName, 'esto_esta_de_mas']))
    ).to.throw('ERROR: should pass two args as follow => Artist_name, country')
  })

  it('faltan argumentos', () => {
    expect(() =>
      handler.handle(unqfy, new Command('', [artistName]))
    ).to.throw('ERROR: should pass two args as follow => Artist_name, country')
  })

})

describe('AddAlbumCommandHandler', () => {
  let handler
  let unqfy

  const artistName  = 'artistName'
  const countryName = 'country name'
  
  beforeEach(() => {
    unqfy   = new UNQfy()
    handler = new AddAlbumCommandHandler()
  })

  it('correct arguments', () => {
    const anArtist  = unqfy.addArtist({ name: artistName, country: countryName })
    const albumName = 'albumName'
    const year      = 2019

    handler.handle(unqfy, new Command('', [anArtist.id, albumName, year]))

    expect(anArtist.albums).to.have.lengthOf(1)
    expect(anArtist.albums[0].name).to.equal(albumName)
    expect(anArtist.albums[0].year).to.equal(year)
  })

})

describe('AddTrackCommandHandler', () => {
  let handler
  let unqfy

  const artistName  = 'artistName'
  const countryName = 'country name'

  const albumName = 'albumName'
  const year      = 2019

  const trackName = 'trackName'
  const duration  = 100
  const genres    = ['Genre1', 'Genre2']
  
  beforeEach(() => {
    unqfy   = new UNQfy()
    handler = new AddTrackCommandHandler()
  })

  it('correct arguments', () => {
    const anArtist  = unqfy.addArtist({ name: artistName, country: countryName })
    const anAlbum   = unqfy.addAlbum(anArtist.id, { name: albumName, year, genres })

    handler.handle(unqfy, new Command('', [anAlbum.id, trackName, duration, genres]))

    expect(anAlbum.tracks).to.have.lengthOf(1)
    expect(anAlbum.tracks[0].name).to.equal(trackName)
    expect(anAlbum.tracks[0].duration).to.equal(duration)
    expect(anAlbum.tracks[0].genres).to.include.members(genres)
  })

})
