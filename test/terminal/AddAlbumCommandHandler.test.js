const expect = require('chai').expect
const { UNQfy } = require('../../model/unqfy')
const { AddAlbumCommand } = require('../../model/terminal/command/all')
describe('AddAlbumCommand', () => {
  let command
  let unqfy

  const artistName  = 'artistName'
  const countryName = 'country name'
  
  beforeEach(() => {
    unqfy   = new UNQfy()
    command = new AddAlbumCommand()
  })

  it('correct arguments', () => {
    const anArtist  = unqfy.addArtist({ name: artistName, country: countryName })
    const albumName = 'albumName'
    const year      = 2019

    command.handle(unqfy, [anArtist.id, albumName, year])

    expect(anArtist.albums).to.have.lengthOf(1)
    expect(anArtist.albums[0].name).to.equal(albumName)
    expect(anArtist.albums[0].year).to.equal(year)
  })

})
