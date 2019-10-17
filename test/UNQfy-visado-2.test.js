const { expect } = require('chai')

const {
    makeUNQfy,
    makeUNQfyWithArtistWithAlbums
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
        
})

function expectHasOnly(expectedElements, aCollection) {
    expect(aCollection).to.have.lengthOf(expectedElements.length)
    expect(aCollection).to.have.members(expectedElements)
}
