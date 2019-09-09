const expect = require('chai').expect

const { UNQfy }        = require('../../src/unqfy')
const AddArtistCommand = require('../../src/terminal/AddArtistCommand')
const AddAlbumCommand  = require('../../src/terminal/AddAlbumCommand')
const AddTrackCommand  = require('../../src/terminal/AddTrackCommand')

describe('AddArtistCommand', () => {
  let command
  let unqfy

  const artistName  = 'artistName'
  const countryName = 'country name'
  
  beforeEach(() => {
    unqfy   = new UNQfy()
    command = new AddArtistCommand()
  })

  it('correct arguments', () => {
    command.handle(unqfy, [artistName, countryName])

    const anArtist = unqfy.getArtistByName(artistName)

    expect(anArtist.name).to.equal(artistName)
    expect(anArtist.country).to.equal(countryName)
  })

})

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

describe('AddTrackCommand', () => {
  let addTrackCommand
  let unqfy

  const artistName  = 'artistName'
  const countryName = 'country name'

  const albumName = 'albumName'
  const year      = 2019

  const trackName = 'trackName'
  const duration  = 100
  const genres    = ['Genre1', 'Genre2']
  
  beforeEach(() => {
    unqfy           = new UNQfy()
    addTrackCommand = new AddTrackCommand()
  })

  it('correct arguments', () => {
    const anArtist  = unqfy.addArtist({ name: artistName, country: countryName })
    const anAlbum   = unqfy.addAlbum(anArtist.id, { name: albumName, year, genres })

    addTrackCommand.handle(unqfy, [anAlbum.id, trackName, duration, genres])

    expect(anAlbum.tracks).to.have.lengthOf(1)
    expect(anAlbum.tracks[0].name).to.equal(trackName)
    expect(anAlbum.tracks[0].duration).to.equal(duration)
    expect(anAlbum.tracks[0].genres).to.include.members(genres)
  })

})
