const expect = require('chai').expect
const { UNQfy } = require('../../src/unqfy')
const { AddTrackCommand } = require('../../src/terminal/command/all')

describe('AddTrackCommand', () => {
  let command
  let unqfy

  const artistName  = 'artistName'
  const countryName = 'country name'

  const albumName = 'albumName'
  const year      = 2019

  const trackName = 'trackName'
  const duration  = "100"
  const genres    = "['Genre1', 'Genre2']"//['Genre1', 'Genre2']
  
  beforeEach(() => {
    unqfy   = new UNQfy()
    command = new AddTrackCommand()
  })

  it('correct arguments', () => {
    const anArtist  = unqfy.addArtist({ name: artistName, country: countryName })
    const anAlbum   = unqfy.addAlbum(anArtist.id, { name: albumName, year, genres })

    command.handle(unqfy, [anAlbum.id, trackName, duration, genres])

    expect(anAlbum.tracks).to.have.lengthOf(1)
    expect(anAlbum.tracks[0].name).to.equal(trackName)
    expect(anAlbum.tracks[0].duration).to.equal(duration)
    expect(anAlbum.tracks[0].genres).to.include.members(['Genre1', 'Genre2'])
  })

})
