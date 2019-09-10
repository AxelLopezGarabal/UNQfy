const expect = require('chai').expect
const { UNQfy } = require('../../src/unqfy')
const { GetArtistByIdCommand } = require('../../src/terminal/command/all')


describe('GetArtistByIdCommand', () => {
  let command
  let unqfy

  const artistName  = 'artistName'
  const countryName = 'country name'
  
  beforeEach(() => {
    unqfy   = new UNQfy()
    command = new GetArtistByIdCommand()
  })

  it('correct arguments', () => {
    const createdArtist = unqfy.addArtist(artistName, countryName)
    const result        = command.handle(unqfy, [createdArtist.id])
    
    expect(result).to.eql(createdArtist)
  })

  it('sobran argumentos', () => {
    const createdArtist = unqfy.addArtist(artistName, countryName)
    expect(() =>
      command.handle(unqfy, [createdArtist.id, 'esto_esta_de_mas'])
    ).to.throw('ERROR: should pass 1 args as follow => id')
  })

  it('faltan argumentos', () => {
    expect(() =>
      command.handle(unqfy, [])
    ).to.throw('ERROR: should pass 1 args as follow => id')
  })

})