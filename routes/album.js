const badRequestErrorModule = require('../errors/BadRequestError')
const resourceAlreadyExistErrorModule = require('../errors/ResourceAlreadyExistError')
const resourceNotFoundErrorModule = require('../errors/ResourceNotFoundError')
const relatedResourceNotFoundErrorModule = require('../errors/RelatedResourceNotFoundError')

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
				//system.save('./backend/backend.json')
				res.status(201).json(album)
			}
			else{
				next(new resourceAlreadyExistErrorModule.ResourceAlreadyExistError())
			}
		}
		else{
			next(new relatedResourceNotFoundErrorModule.RelatedResourceNotFoundError())
		}
	}
	else{
		next( new badRequestErrorModule.BadRequestError())
	}
});

router.get('/:id', (req, res, next) => {
	const id = parseInt(req.params.id)
	if(system.verifyId(id) && id > 0){
		const album = system.getAlbumById(id);
		res.status(200).json( album )
	}
	else{
		next(new resourceNotFoundErrorModule.ResourceNotFoundError())
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
		//system.save('./backend/backend.json')
		res.status(200).json(
			album
		)
	}
	else{
		next(new resourceNotFoundErrorModule.ResourceNotFountError())
	}
});

router.delete('/:id', (req, res, next) => {
	const idParam = parseInt(req.params.id);
	if(system.verifyId(idParam) && idParam > 0){
		const artist = system.removeAlbum(idParam);
		//system.save('./backend/backend.json')
		res.status(204).json({
		})
	}
	else{

		next(new resourceNotFoundErrorModule.ResourceNotFoundError())
	}
});

module.exports = router;