
const express = require('express');
const router = express.Router();

const system = require('../backend/mockBBDD')

router.post('/', (req, res, next) => {
	const body = req.body
	res.status(201).json({
		id: newartist.id,
		name: newartist.name,
		albums: newartist.albums,
		country: newartist.country
	});
	res.status(200).json({
		method: 'POST',
	})
});
router.get('/:id', (req, res, next) => {
	const id = parseInt(req.params.id)
	if(system.verifyId(id) && id > 0){
		const playlist = system.getPlaylistById(id);
		res.status(200).json(
			playlist
		)
	}
	else{
		res.status(404).json({
			status: 404,
			errorCode: 'RESOURCE_NOT_FOUND'
		})
	}
});

router.delete('/:id', (req, res, next) => {
	const idParam = parseInt(req.params.id);
	if(system.verifyId(idParam) && idParam > 0){
		system.removePlaylist(idParam);
		res.status(204).json({
		})
	}
	else{
		res.status(404).json({
			status: 404,
			errorCode: 'RESOURCE_NOT_FOUND'
		})
	}
});

router.get('/', (req, res, next) => {
	const query = req.query
	if(query == null){
		res.status(200).json(
			system.searchByNamePartial("").playlists
		)
	}
	else{
		res.status(200).json(
			system.getPlaylistByQuery(query).playlists	
		)
	}
});

module.exports = router;