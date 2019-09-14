const expect = require('chai').expect
const { UNQfy } = require('../../src/unqfy')
const { GetAlbumByIdCommand } = require('../../src/terminal/command/all')


describe('GetAlbumByIdCommand', () => {
  let command
  let unqfy

  const artistName  = 'artistName'
  const countryName = 'country name'

  const albumName = 'Album name'
  const year      = 2019
  
  beforeEach(() => {
    unqfy   = new UNQfy()
    command = new GetAlbumByIdCommand()
  })

  it('correct arguments', () => {
    const artist = unqfy.addArtist(artistName, countryName)
    const album  = unqfy.addAlbum(artist.id, albumName, year)
    
    const result = command.handle(unqfy, [album.id])
    
    expect(result).to.eql(album)
  })

  it('sobran argumentos', () => {
    const artist = unqfy.addArtist(artistName, countryName)
    unqfy.addAlbum(artist.id, albumName, year)
    expect(() =>
      command.handle(unqfy, [artist.id, 'esto_esta_de_mas'])
    ).to.throw('ERROR: should pass 1 args as follow => id')
  })

  it('faltan argumentos', () => {
    expect(() =>
      command.handle(unqfy, [])
    ).to.throw('ERROR: should pass 1 args as follow => id')
  })

})