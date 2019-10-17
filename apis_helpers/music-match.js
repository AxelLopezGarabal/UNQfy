const rp = require('request-promise');
const BASE_URL = 'http://api.musixmatch.com/ws/1.1';

const search = (resource, query) =>
  rp.get({
    uri: BASE_URL + '/' + resource,
    qs: { apikey: 'ad4a8bc564bf2347298480f05ffcb4b6', ...query},
    json: true
  })
  .then(response => {
    const header = response.message.header
    const body   = response.message.body
    
    if (header.status_code !== 200)
      throw new Error('status code != 200')
    
    return body
  })

const mapProperty = propertyName => aList =>
  aList.map(element => element[propertyName])

const searchArtists = artistName =>
  search('artist.search', {q_artist: artistName})
    .then(body => body.artist_list.map(artist => artist.artist))

const firstArtistNamed = artistName =>
  searchArtists(artistName)
    .then(artists => artists[0])

const searchDiscography = artistId =>
  search('artist.albums.get', { artist_id: artistId })
    .then(body => body.album_list.map(album => album.album))

const artistDiscografy = artistName =>
  firstArtistNamed(artistName)
    .then(artist => searchDiscography(artist.artist_id))

// Prueba
// artistDiscografy('The Beatles')
//     .then(mapProperty('album_name'))
//     .then(albumNames => new Set(albumNames))
//     .then(console.log)
//     .catch(console.error)

module.exports = {
    search,
    searchArtists,
    firstArtistNamed,
    searchDiscography,
    artistDiscografy
}