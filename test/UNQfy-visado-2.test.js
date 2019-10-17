const { expect } = require('chai')
const { UNQfy }  = require('../model/unqfy')

// TODO: extraer helpers a un archivo
const makeUNQfy = () => new UNQfy()

const makeArtistData = () => ({name: 'pepe', country: 'argentina'})
const makeAlbumData  = name => ({ name })
const makeTrackData  = () => ({ })

function createAndAddArtist(unqfy, artistName, country) {
    const artist = unqfy.addArtist({ name: artistName, country })
    return artist
}
  
function createAndAddAlbum(unqfy, artistId, albumName, albumYear) {
    return unqfy.addAlbum(artistId, { name: albumName, year: albumYear })
}
  
function createAndAddTrack(unqfy, albumName, trackName, trackDuraction, trackGenres) {
    return unqfy.addTrack(albumName, { name: trackName, duration: trackDuraction, genres: trackGenres })
}

describe('UNQfy', () => {
    let unqfy
 
    beforeEach(() => {
        unqfy        = makeUNQfy()
        artist       = unqfy.addArtist(makeArtistData())
        album01      = unqfy.addAlbum(artist.id, makeAlbumData('album01'))
        trackAlbum01 = unqfy.addTrack(album01.id, {name: 't1', duration: 100, genres: ['punk']})
        
        album02      = unqfy.addAlbum(artist.id, makeAlbumData('album02'))
        trackAlbum02 = unqfy.addTrack(album02.id, {name: 't2', duration: 100, genres: ['punk']})

        playlist     = unqfy.createPlaylist('name', ['punk'], 1000000)
    })

    describe('Se le pueden pedir los albumes de un artista en base a su nombre', () => {
        describe('... si el artista no existe arroja una excepcion', () =>{
            const unqfy = makeUNQfy()
            const invalidArtistName = 'pepe'
            
            expect(() =>
                unqfy.getAlbumsForArtist(invalidArtistName)
            ).to.throw(`Error: Could not find "artist" with "name" equal to "${invalidArtistName}"`)
        })

        describe('... si el artista existe retorna todos sus albumes', () =>{
            const {unqfy, artist, albums} = makeUNQfyWithArtist(makeArtistData(), [makeAlbumData()])

            expectHasOnly(
                albums,
                unqfy.getAlbumsForArtist(artist.name))
        })
    })
        
})

function makeUNQfyWithArtist(artistData, albumsData) {
    const unqfy  = makeUNQfy()
    const artist = unqfy.addArtist(artistData)    
    albumsData.forEach(albumData => unqfy.addAlbum(artist.id, albumData))
    
    return {
        unqfy,
        artist,
        albums: artist.albums
    }
}

function expectHasOnly(expectedElements, aCollection) {
    expect(aCollection).to.have.lengthOf(expectedElements.length)
    expect(aCollection).to.have.members(expectedElements)
}