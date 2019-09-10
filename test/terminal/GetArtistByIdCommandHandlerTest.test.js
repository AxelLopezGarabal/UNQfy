const expect = require('chai').expect
const { UNQfy } = require('../../src/unqfy')
const Command = require('../../src/terminal/command/Command')
const { GetArtistByIdCommandHandler } = require('../../src/terminal/command_handlers/terminalCommandHandlers')


describe('GetArtistByIdCommandHandler', () => {
  let handler
  let unqfy

  const artistName  = 'artistName'
  const countryName = 'country name'
  
  beforeEach(() => {
    unqfy   = new UNQfy()
    handler = new GetArtistByIdCommandHandler()
  })

  it('correct arguments', () => {
    const createdArtist = unqfy.addArtist(artistName, countryName)
    const result        = handler.handle(unqfy, new Command('', [createdArtist.id]))
    expect(result).to.eql(createdArtist)
  })

  it('sobran argumentos', () => {
    const createdArtist = unqfy.addArtist(artistName, countryName)
    expect(() =>
      handler.handle(unqfy, new Command('', [createdArtist.id, 'esto_esta_de_mas']))
    ).to.throw('ERROR: should pass one args as follow => Artist_id')
  })

  it('faltan argumentos', () => {
    expect(() =>
      handler.handle(unqfy, new Command('', []))
    ).to.throw('ERROR: should pass one args as follow => Artist_id')
  })

})