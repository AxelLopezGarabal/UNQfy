const expect = require('chai').expect
const { UNQfy } = require('../../model/unqfy')
const { AddArtistCommand } = require('../../model/terminal/command/all')

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

  it('sobran argumentos', () => {
    expect(() =>
    command.handle(unqfy, [artistName, countryName, 'esto_esta_de_mas'])
    ).to.throw('ERROR: should pass 2 args as follow => name,country')
  })

  it('faltan argumentos', () => {
    expect(() =>
      command.handle(unqfy, [artistName])
    ).to.throw('ERROR: should pass 2 args as follow => name,country')
  })

})