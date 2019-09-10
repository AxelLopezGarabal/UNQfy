const { expect } = require('chai')
const { UNQfy }  = require('../src/unqfy')

describe('UNQfy', () => {
    let unqfy
    let artist
    let album01
    let album02
    let trackAlbum01
    let trackAlbum02
    let playlist

    beforeEach(() => {
        unqfy = new UNQfy()
        artist       = unqfy.addArtist(makeArtistData())
        album01      = unqfy.addAlbum(artist.id, makeAlbumData())
        trackAlbum01 = unqfy.addTrack(album01.id, {name: 't1', duration: 100, genres: ['punk']})
        
        album02      = unqfy.addAlbum(artist.id, makeAlbumData())
        trackAlbum02 = unqfy.addTrack(album02.id, {name: 't2', duration: 100, genres: ['punk']})

        playlist     = unqfy.createPlaylist('name', ['punk'], 1000000)
    })

    describe('Cuando se elimina un album...', () => {
        
        beforeEach(() => 
            unqfy.removeAlbum(album01.id)
        )

        it('...el sistema ya no lo tiene registrado', () => {
            expect(unqfy.albums).to.have.lengthOf(1)
            expect(unqfy.albums).to.include(album02)
        })

        it('...el artista ya no lo tiene registrado', () => {
            expect(artist.albums).to.have.lengthOf(1)
            expect(artist.albums).to.include(album02)
        })

        it('... desaparece de las playlist', () => {
            expect(playlist.tracks).to.have.lengthOf(1)
            expect(playlist.tracks).to.include(trackAlbum02)
        });
    })

    describe('cuando se elimina un artista...', () => {
        beforeEach(() => {
            unqfy.removeArtist(artist.id)
        })

        it('el sistema ya no lo recuerda', () => {
            expect(unqfy.artists).to.be.empty
        })

        it('se eliminan los albumes del artista', () => {
            expect(unqfy.albums).to.be.empty
        })

        it('se eliminan de las playlists todos sus temas', () => {
            expect(playlist.tracks).to.be.empty
        })
    })

    it('se pueden eliminar playlists', () => {
        const anotherPlaylist = unqfy.createPlaylist('p1', ['un genero'], 1000)
        unqfy.removePlaylist(playlist.id)
        expect(unqfy.playlists).to.have.lengthOf(1)
        expect(unqfy.playlists).to.include(anotherPlaylist)
    });

})

const makeArtistData = () => ({name: 'pepe', country: 'argentina'})
const makeAlbumData  = () => ({ })
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