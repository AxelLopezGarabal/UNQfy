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

            unqfy = makeUNQfy(albumsDataProvider)
        })
        it('...si el artista existe busca y le agrega sus albumes', async () => {
            const artistName = 'artist name'
            const artist     = unqfy.addArtist({name: artistName, country: 'argentina'})
            
            await unqfy.populateAlbumsForArtist(artist.name)

            const addedAlbum = artist.albums[0]
            
            /* TODO: refactorizar. Esto esta como para pegarse un tiro */
            expect(artist.albums).to.have.lengthOf(1)
            
            expect(addedAlbum.name).to.eq(albumData01.name)
            expect(addedAlbum.year).to.eq(albumData01.year)
            expect(addedAlbum.tracks).to.have.lengthOf(1)

            const addedTrack = addedAlbum.tracks[0]
            
            expect(addedTrack.name).to.eq(trackData01.name)
            expect(addedTrack.duration).to.eq(trackData01.duration)
            expect(addedTrack.genres).to.have.members(trackData01.genres)

            
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
})

function expectHasOnly(expectedElements, aCollection) {
    expect(aCollection).to.have.lengthOf(expectedElements.length)
    expect(aCollection).to.have.members(expectedElements)
}
