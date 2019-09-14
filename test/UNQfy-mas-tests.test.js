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
    })

    describe('registro de artistas...', () => {
        it('no se puede registrar un artista cuando ya existe uno con el mismo nombre', () => {
            const nombre = 'juan'
            unqfy.addArtist({ name: nombre, country: 'argentina' })
            
            expect(() =>
                unqfy.addArtist({ name: nombre, country: 'uruguay' })
            ).to.throw(`Alguien ya esta registrado con el nombre ${nombre}`)
        })
    })

    describe('Busquedas', () => {
        it('se le puede pedir todas las entidades que se tengan el mismo nombre', () => {
            const juanName = 'juan'

            const juanArtist = unqfy.addArtist({ name: juanName, country: 'argentina' })
            const juanAlbum  = unqfy.addAlbum(juanArtist.id, { name: juanName, year: 2019 })
            const juanTrack  = unqfy.addTrack(juanAlbum.id, { name: juanName, duration: 10, genres: [] })

            const pabloArtist = unqfy.addArtist({ name: 'pablo', country: 'argentina' })
            const cosoAlbum   = unqfy.addAlbum(pabloArtist.id, { name: 'cosoAlbum', year: 2111 })
            const cosoTrack   = unqfy.addTrack(cosoAlbum.id, { name: 'trackCoso', duration: 10, genres: [] })

            const resultado = unqfy.searchByName(juanName)
            
            expect(resultado.artists).to.include(juanArtist)
            expect(resultado.artists).not.to.include(pabloArtist)

            expect(resultado.albums).to.include(juanAlbum)
            expect(resultado.albums).not.to.include(cosoAlbum)

            expect(resultado.tracks).to.include(juanTrack)
            expect(resultado.tracks).not.to.include(cosoTrack)
        })

        it('se le puede pedir todas las entidades que matcheen parcialmente con un nombre', () => {
            const juString = 'ju'

            const juanArtist = unqfy.addArtist({ name: 'juan', country: 'argentina' })
            const juanAlbum  = unqfy.addAlbum(juanArtist.id, { name: 'jujuy', year: 2019 })
            const juanTrack  = unqfy.addTrack(juanAlbum.id, { name: 'naranju', duration: 10, genres: [] })

            const pabloArtist = unqfy.addArtist({ name: 'pablo', country: 'argentina' })
            const cosoAlbum   = unqfy.addAlbum(pabloArtist.id, { name: 'cosoAlbum', year: 2111 })
            const cosoTrack   = unqfy.addTrack(cosoAlbum.id, { name: 'trackCoso', duration: 10, genres: [] })

            const resultado = unqfy.searchByNamePartial(juString)
            
            expect(resultado.artists).to.include(juanArtist)
            expect(resultado.artists).not.to.include(pabloArtist)

            expect(resultado.albums).to.include(juanAlbum)
            expect(resultado.albums).not.to.include(cosoAlbum)

            expect(resultado.tracks).to.include(juanTrack)
            expect(resultado.tracks).not.to.include(cosoTrack)
        })

        it('se puede buscar un artista por id', () => {
            const juanArtist  = unqfy.addArtist({ name: 'juan', country: 'argentina' })
            const pedroArtist = unqfy.addArtist({ name: 'pedro', country: 'argentina' })

            expect(unqfy.getArtistById(juanArtist.id)).to.equal(juanArtist)
        })

        describe('Busqueda de album por id', () => {
            it('si se lo encuentra se lo retorna', () => {
                const artist01 = unqfy.addArtist({ name: 'juan', country: 'argentina' })
                const album01  = unqfy.addAlbum(artist01.id, { name: 'album01', country: 'argentina' })

                const artist02 = unqfy.addArtist({ name: 'pedro', country: 'argentina' })
                const album02  = unqfy.addAlbum(artist02.id, { name: 'album02', country: 'argentina' })

                expect(unqfy.getAlbumById(album02.id)).to.equal(album02)
            })

            it('si no existe se arroja una excepcion', () => {
                unqfy.addArtist({ name: 'juan', country: 'argentina' })
                expect(() => unqfy.getAlbumById(0)).to.throw('album not found')
                //expect(() => unqfy.getAlbumById(0)).to.throw('No se encontro entidad con id 0 en albums')
            })
        })
    })

    it('puede decir si un artista existe en base a un id', () => {
        const artist = unqfy.addArtist('juan', 'argentina')
        expect(unqfy.existsArtistWithId(artist.id)).to.be.true
        expect(unqfy.existsArtistWithId(1000)).to.be.false
    })

    it('puede decir si un artista existe en base a un nombre', () => {
        const artist = unqfy.addArtist('juan', 'argentina')
        expect(unqfy.existSomeoneCalled(artist.name)).to.be.true
        expect(unqfy.existSomeoneCalled('aasdasdasdas')).to.be.false
    })
    
    describe('Cuando se crea un usuario', () => {
        let user
        
        beforeEach(() => {
            user = unqfy.addUser({name: 'juan'})
        })

        it('lo puede buscar por id', () => {
            expect(unqfy.getUserById(user.id)).to.equal(user)
        })

        it('tiene un nombre', () => {
            expect(user.name).to.equal('juan')
        })

        it('aun no tiene ninguna playlist', () => {
            expect(user.playlists).to.be.empty
        })

        it('no puede existir otro usuario con el mismo nombre', () => {
            expect(() => 
                unqfy.addUser({name: user.name})
            ).to.throw(`Alguien ya esta registrado con el nombre ${user.name}`)
        })

        it('se le puede generar una playlist generada automaticamente en base a una lista de generos y una duracion maxima', () => {
            const playlistName    = 'playlist name'
            const genresToInclude = ['genre1', 'genre2']
            const maxDuration     = 400

            const artistA = unqfy.addArtist('artistA', 'argentina')
            const albumA  = unqfy.addAlbum(artistA.id, 'albumA', 2019)
            const track1 = unqfy.addTrack(albumA.id, { name: 'track1', duration: 1, genres: ['genre1'] })

            const userPlaylist = unqfy.createPlaylistFor(user.id, playlistName, genresToInclude, maxDuration)

            expect(user.playlists).to.have.lengthOf(1)
            expect(user.playlists[0].hasTrack(track1)).to.be.true
        })

        it('puede registrar la escucha de un track por parte de un usuario', () => {
            const artistA = unqfy.addArtist('artistA', 'argentina')
            const albumA  = unqfy.addAlbum(artistA.id, 'albumA', 2019)
            const track1 = unqfy.addTrack(albumA.id, { name: 'track1', duration: 1, genres: [] })
            const track2 = unqfy.addTrack(albumA.id, { name: 'track2', duration: 1, genres: [] })

            unqfy.registerListening(user.id, track1.id)

            expect(user.hasListened(track1)).to.be.true
            expect(user.hasListened(track2)).to.be.false
        })
    })
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