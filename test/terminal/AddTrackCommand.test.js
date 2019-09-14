const expect = require('chai').expect
const { UNQfy } = require('../../src/unqfy')
const { AddTrackCommand } = require('../../src/terminal/command/all')

describe('AddTrackCommand', () => {
  let command
  let unqfy

  const trackName = 'trackName'
  const duration  = "100"
  const genres    = "punk, folk, qwerty"

  beforeEach(() => {
    unqfy = new UNQfy()
    command = new AddTrackCommand()
  })

  it('correct arguments', () => {
    const anArtist = unqfy.addArtist({ name: 'pepe', country: 'argentina' })
    const anAlbum  = unqfy.addAlbum(anArtist.id, { name: 'albumName', year: 2019 })

    command.handle(unqfy, [anAlbum.id, trackName, duration, genres])

    expect(anAlbum.tracks).to.have.lengthOf(1)
    expect(anAlbum.tracks[0].name).to.equal(trackName)
    expect(anAlbum.tracks[0].duration).to.equal(duration)
    expect(anAlbum.tracks[0].genres).to.include.members(['punk', 'folk', 'qwerty'])
  })

  it('sobran argumentos', () => {
    expect(() =>
      command.handle(unqfy, [1, trackName, duration, genres, 'esto esta de mas'])
    ).to.throw('ERROR: should pass 4 args as follow => album id,track name,duration,genres')
  })

  it('faltan argumentos', () => {
    expect(() =>
      command.handle(unqfy, [1, trackName, duration])
    ).to.throw('ERROR: should pass 4 args as follow => album id,track name,duration,genres')
  })

})