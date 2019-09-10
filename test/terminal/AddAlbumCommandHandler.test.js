const expect = require('chai').expect
const { UNQfy } = require('../../src/unqfy')
const Command = require('../../src/terminal/command/Command')
const { AddAlbumCommandHandler } = require('../../src/terminal/command_handlers/terminalCommandHandlers')
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

    handler.handle(unqfy, new Command('addAlbum', [anArtist.id, albumName, year]))

    expect(anArtist.albums).to.have.lengthOf(1)
    expect(anArtist.albums[0].name).to.equal(albumName)
    expect(anArtist.albums[0].year).to.equal(year)
  })

})
