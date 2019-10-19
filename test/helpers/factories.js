const { UNQfy }  = require('../../model/unqfy')

const makeUNQfy = albumsDataProvider => new UNQfy({albumsDataProvider})

const makeArtistData = ()   => ({name: 'pepe', country: 'argentina'})
const makeAlbumData  = name => ({ name })
const makeTrackData  = ()   => ({ })
  
const createAndAddArtist = (unqfy, artistName, country) =>
  unqfy.addArtist({ name: artistName, country })
    
const createAndAddAlbum = (unqfy, artistId, albumName, albumYear) =>
  unqfy.addAlbum(artistId, { name: albumName, year: albumYear })
    
const createAndAddTrack = (unqfy, albumName, trackName, trackDuraction, trackGenres) =>
  unqfy.addTrack(albumName, { name: trackName, duration: trackDuraction, genres: trackGenres })
  
const makeUNQfyWithArtist = (artistData, albumsData) => {
  const unqfy  = makeUNQfy()
  const artist = unqfy.addArtist(artistData)    
  
  albumsData.forEach(albumData => unqfy.addAlbum(artist.id, albumData))
  
  return {
      unqfy,
      artist,
      albums: artist.albums
  }
}

const makeUNQfyWithArtistWithAlbums = () =>
  makeUNQfyWithArtist(makeArtistData(), [makeAlbumData()])

module.exports = {

  makeUNQfy,
  makeArtistData,
  makeAlbumData,
  makeTrackData,
  createAndAddArtist,
  createAndAddAlbum,
  createAndAddTrack,
  makeUNQfyWithArtist,
  makeUNQfyWithArtistWithAlbums

}
