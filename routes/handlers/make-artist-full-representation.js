module.exports = artist => ({
    id: parseInt(artist.id),
    name: artist.name,
    country: artist.country,
    albums: artist.albums
})