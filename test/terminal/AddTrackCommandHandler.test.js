const expect = require('chai').expect
const { UNQfy } = require('../../src/unqfy')
const Command = require('../../src/terminal/command/Command')
const { AddTrackCommandHandler } = require('../../src/terminal/command_handlers/terminalCommandHandlers')

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
