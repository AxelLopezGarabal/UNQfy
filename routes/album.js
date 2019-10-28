
const express = require('express');
const router = express.Router();

const system = require('../backend/mockBBDD')

router.post('/', (req, res, next) => {
	const body = req.body
	const c1 = (Object.keys(body).length == 3)
	const c2 = body.name != undefined
	const c3 = body.year != undefined
	const c4 = body.artistId != undefined
	const c5 = system.verifyId(body.artistId)
	if(c1 && c2 && c3 && c4){
		if(c5){
			const id   = body.artistId
			const name = body.name
			const year = body.year	
			if(!system.isAuthorOfAlbum(id, name)){
				const album = system.addAlbum(id, {name: name, year: year})
				res.status(201).json(
					album
				)
			}
			else{
				res.status(409).json({
					status: 409,
					errorCode: "RESOURCE_ALREADY_EXISTS"
				});
			}
		}
		else{
			res.status(404).json({
				status: 404,
				errorCode: 'RELATED_RESOURCE_NOT_FOUND'
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
	const id = parseInt(req.params.id)
	if(system.verifyId(id) && id > 0){
		const album = system.getAlbumById(id);
		res.status(200).json(
			album
		)
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
			system.searchByNamePartial("").albums
		)
	}
	else{
		res.status(200).json(
			system.searchByNamePartial(query.name).albums
		)
	}
});

router.patch('/:id', (req, res, next) => {
	const id = parseInt(req.params.id)
	const body = {year: req.body.year}
	if(system.verifyId(id) && id > 0){
		const album = system.updateAlbum(id, body);
		res.status(200).json(
			album
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
		const artist = system.removeAlbum(idParam);
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