const { expect } = require('chai')

const {
    makeUNQfy,
    makeUNQfyWithArtistWithAlbums,
    makeUNQfyWithArtistWithoutAlbums
} = require('./helpers/factories')

describe('UNQfy', () => {

    describe('Se le pueden pedir los albumes de un artista en base a su nombre', () => {
        describe('... si el artista no existe arroja una excepcion', () =>{
            const unqfy = makeUNQfy()
            const invalidArtistName = 'pepe'
            
            expect(() =>
                unqfy.getAlbumsForArtist(invalidArtistName)
            ).to.throw(`Error: Could not find "artist" with "name" equal to "${invalidArtistName}"`)
        })

        describe('... si el artista existe retorna todos sus albumes', () =>{
            const {unqfy, artist, albums} = makeUNQfyWithArtistWithAlbums()

            expectHasOnly(
                albums,
                unqfy.getAlbumsForArtist(artist.name))
        })
    })

    describe('Se le puede pedir que popule los albums de un artista', () => {
        let trackData01
        let albumData01
        let unqfy

        beforeEach(() => {
            trackData01 = { name: 'track01', duration: 100, genres: ['genre01'] }
            albumData01 = { name: 'album01', year: 2019, tracks: [ trackData01 ] }

            const albumsDataProvider = {
                findFor: artistName => Promise.resolve([ albumData01 ])
            }

            albumsDataProvider.findFor('asdasd').then(console.log)

            unqfy = makeUNQfy({albumsDataProvider})
        })
        it('...si el artista existe busca y le agrega sus albumes', () => {
            const artistName = 'artist name'
            const artist     = unqfy.addArtist({name: artistName, country: 'argentina'})
            
            unqfy.populateAlbumsForArtist(artist.name)

            expect(artist._hasAlbumCalled(albumData01.name)).to.be.true
        })
    })
})

function expectHasOnly(expectedElements, aCollection) {
    expect(aCollection).to.have.lengthOf(expectedElements.length)
    expect(aCollection).to.have.members(expectedElements)
}
