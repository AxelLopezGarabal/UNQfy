const rp = require('request-promise');

const accessToken = 'BQBNPBeMttO7wiWzn1n70qQLNUPwMyQE3haHmhlpbg5WE2ck8umlrbXyl2dOC3DbymVNJzUt7xr9md5Nz3N4c5CkXWI67dIIaSxceiJOSbVSvbnf-rNVX_KCHmbtwj-oGlgnv9958b8h5NsWeVTqzQEaa8qN3pj7lkvKqEYQf-O-_1OtKQqC'

const baseURL = 'https://api.spotify.com/v1'

const get = path => query =>
	rp.get({
		uri: baseURL + path,
		headers: { Authorization: 'Bearer ' + accessToken },
		qs: query,
		json: true
	})

const search = get('/search')

const searchEntities = entityType => aPartialName =>
	search({q: aPartialName, type: entityType})
		.then(body => body[entityType + 's'].items)

const searchArtists = searchEntities('artist')

const findArtist = artistPartialName =>
	searchArtists(artistPartialName).then(artists => artists[0])

const allAlbums = artistPartialName =>
	findArtist(artistPartialName)
		.then(artist    => get(`/artists/${artist.id}/albums`)())
		.then(body      => body.items)
		.then(albums    => albums.map(album => album.id))
		.then(albumsIds => Promise.all(albumsIds.map(getAlbumById)))

const getAlbumById = albumId =>
	get(`/albums/${albumId}`)()


const parseAlbumYear = date => parseInt(date.slice(0,4))

const extractAlbumData = spotifyAlbum =>({
	name: spotifyAlbum.name,
	year: parseAlbumYear(spotifyAlbum.release_date),
	tracks: spotifyAlbum.tracks.items.map(extractTrackData)
})

const extractTrackData = spotifyTrack =>({
	name: spotifyTrack.name,
	duration: spotifyTrack.duration_ms
})

const populatedAlbumsDataFor = artistName =>
	allAlbums(artistName)
		.then(albums => albums.map(extractAlbumData))

// Prueba
populatedAlbumsDataFor('beatles')
	.then(albums => JSON.stringify(albums, null, 2))
	.then(console.log)

module.exports = {
	populatedAlbumsDataFor,
	findArtist,
	allAlbums
}
// /v1/albums/{id}
// /v1/albums/{id}/tracks