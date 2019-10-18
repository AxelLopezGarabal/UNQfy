const rp = require('request-promise');

const accessToken = 'BQDf0rIp1qVTKMaCIf27X8w8rGutZ0z90aspbckzFZdtbBcPLAFLlr_MOGI3jUP-aAzqD7MDq6O_6WhMt7mZ6I1YdSc2JGtvarZa18UK1lhoAU518A64lWA_vyBGwy34WuPE3_Jzim7ojcwqMTmFC9HjkeYSlGRXv5L9zbAagTD5uaJ6fuax'

const baseURL = 'https://api.spotify.com/v1'

const get = resourseURL => query =>
	rp.get({
		uri: baseURL + resourseURL,
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

allAlbums('beatles')
	.then(albums => albums.map(album => ({
		name: album.name,
		year: parseInt(album.release_date.slice(0,4)),
		tracks: album.tracks.items
	})))

	.then(console.log)

module.exports = {
	findArtist,
	allAlbums
}
// /v1/albums/{id}
// /v1/albums/{id}/tracks