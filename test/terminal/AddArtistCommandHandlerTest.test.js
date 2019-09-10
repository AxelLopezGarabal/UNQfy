const expect = require('chai').expect
const { UNQfy } = require('../../src/unqfy')
const Command = require('../../src/terminal/command/Command')
const { AddArtistCommandHandler } = require('../../src/terminal/command_handlers/terminalCommandHandlers')

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
    handler.handle(unqfy, new Command('addArtist', [artistName, countryName]))

    const anArtist = unqfy.getArtistByName(artistName)

    expect(anArtist.name).to.equal(artistName)
    expect(anArtist.country).to.equal(countryName)
  })

  it('sobran argumentos', () => {
    expect(() =>
      handler.handle(unqfy, new Command('addArtist', [artistName, countryName, 'esto_esta_de_mas']))
    ).to.throw('ERROR: should pass two args as follow => Artist_name, country')
  })

  it('faltan argumentos', () => {
    expect(() =>
      handler.handle(unqfy, new Command('addArtist', [artistName]))
    ).to.throw('ERROR: should pass two args as follow => Artist_name, country')
  })

})