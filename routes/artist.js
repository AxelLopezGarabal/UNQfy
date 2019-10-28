const express = require('express');
const router = express.Router();

const system = require('../backend/mockBBDD')

router.post('/', (req, res, next) => {
	const body = req.body
	const c1 = (Object.keys(body).length == 2)//verifico que no me pasen mas de 2 elementos
	const c2 = body.country != undefined//country tiene que estar
	const c3 = body.name != undefined//name tiene que estar
	if( c1 && c2 && c3){
		if(! system.existsArtistWithName(body.name)){
			const newartist = system.addArtist(body)
			res.status(201).json({
				id: newartist.id,
				name: newartist.name,
				albums: newartist.albums,
				country: newartist.country
			});
		}
		else{
			res.status(409).json({
				status: 409,
				errorCode: "RESOURCE_ALREADY_EXISTS"
			});
		}	
	}
	else{
		res.status(400).json({
			status: 400,
			errorCode: 'BAD_REQUEST'
		});
	}
});

router.get('/:id', (req, res, next) => {
	const idParam = parseInt(req.params.id);
	if(system.verifyId(idParam) && idParam > 0){
		const artist = system.getArtistById(idParam);
		res.status(200).json(
			artist
		)
	}
	else{
		res.status(404).json({
			status: 404,
			errorCode: 'RESOURCE_NOT_FOUND'
		})
	}
});

router.put('/:id', (req, res, next) => {
	const idParam = parseInt(req.params.id);
	const body = req.body
	if(system.verifyId(idParam) && idParam > 0){
		const modArtist = system.updateArtist(idParam, body)
		res.status(200).json({
			id: modArtist.id,
			name: modArtist.name,
			albums: modArtist.albums,
			country: modArtist.country
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
			system.searchByNamePartial("").artists
		)
	}
	else{
		res.status(200).json(
			system.searchByNamePartial(query.name).artists
		)
	}
});

router.delete('/:id', (req, res, next) => {
	const idParam = parseInt(req.params.id);
	if(system.verifyId(idParam) && idParam > 0){
		const artist = system.removeArtist(idParam);
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

module.exports = router;