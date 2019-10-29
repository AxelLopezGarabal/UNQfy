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


    describe('Actualizacion de datos de artista', () => {
        it('si no existe el artista arroja una excepcion', () => {
            const unqfy           = makeUNQfy()
            const invalidArtistId = 123123
            
            expect(() =>
                unqfy.updateArtist(invalidArtistId, { name: 'new name' })
            ).to.throw(`Error: Could not find "artist" with "id" equal to "${invalidArtistId}"`)
        })

        it('actualiza los datos de un artista', () => {
            const unqfy = makeUNQfy()

            const artistName = 'artist name'
            const artist     = unqfy.addArtist({name: artistName, country: 'argentina'})

            const newName = 'newName'

            unqfy.updateArtist(artist.id, { name: newName })

            expect(artist.name).to.eq(newName)
        })
    })

    describe('Actualizacion de datos de album', () => {
        it('si no existe el album arroja una excepcion', () => {
            const unqfy          = makeUNQfy()
            const invalidAlbumId = 123123
            
            expect(() =>
                unqfy.updateAlbum(invalidAlbumId, { year: 2000 })
            ).to.throw(`Error: Could not find "album" with "id" equal to "${invalidAlbumId}"`)
        })

        it('actualiza los datos de un album', () => {
            const unqfy  = makeUNQfy()
            const artist = unqfy.addArtist({ name: 'pepe', country: 'argentina' })
            const album  = unqfy.addAlbum(artist.id, { name: 'albumName', year: 2019 })
            
            const newYear = album.year + 1

            unqfy.updateAlbum(album.id, { year: newYear })

            expect(album.year).to.eq(newYear)
        })
    })
})

function expectHasOnly(expectedElements, aCollection) {
    expect(aCollection).to.have.lengthOf(expectedElements.length)
    expect(aCollection).to.have.members(expectedElements)
}
