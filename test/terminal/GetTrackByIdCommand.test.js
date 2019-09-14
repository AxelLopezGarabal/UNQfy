const expect = require('chai').expect
const { UNQfy } = require('../../src/unqfy')
const { GetTrackByIdCommand } = require('../../src/terminal/command/all')

describe('GetTrackByIdCommand', () => {
  let command
  let unqfy
  let createdTrack

  const artistName  = 'artistName'
  const countryName = 'country name'

  const albumName = 'Album name'
  const year      = 2019

  const trackName     = "Track name"
  const trackDuration = "100"
  const genres        = '["punk", "folk"]'
  
  beforeEach(() => {
    unqfy   = new UNQfy()
    command = new GetTrackByIdCommand()

    const artist = unqfy.addArtist(artistName, countryName)
    const album  = unqfy.addAlbum(artist.id, albumName, year)
    createdTrack  = unqfy.addTrack(album.id, trackName, trackDuration, genres)
  })

  it('correct arguments', () => {
    const result = command.handle(unqfy, [createdTrack.id])
    expect(result).to.eql(createdTrack)
  })

  it('sobran argumentos', () => {
    expect(() =>
      command.handle(unqfy, [createdTrack.id, 'esto_esta_de_mas'])
    ).to.throw('ERROR: should pass 1 args as follow => id')
  })

  it('faltan argumentos', () => {
    expect(() =>
      command.handle(unqfy, [])
    ).to.throw('ERROR: should pass 1 args as follow => id')
  })

})