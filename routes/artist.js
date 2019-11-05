const badRequestErrorModule = require('../errors/BadRequestError')
const resourceAlreadyExistErrorModule = require('../errors/ResourceAlreadyExistError')
const resourceNotFoundErrorModule = require('../errors/ResourceNotFoundError')

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
			//system.save('./backend/backend.json')
			res.status(201).json(newartist);
		}
		else{
			next(new resourceAlreadyExistErrorModule.ResourceAlreadyExistError())
		}	
	}
	else{
		next(new badRequestErrorModule.BadRequestError())
	}
});

router.get('/:id', (req, res, next) => {
	const idParam = parseInt(req.params.id);
	if(system.verifyId(idParam) && idParam > 0){
		const artist = system.getArtistById(idParam);
		res.status(200).json(artist)
	}
	else{
		next(new resourceNotFoundErrorModule.ResourceNotFoundError())
	}
});

router.put('/:id', (req, res, next) => {
	const idParam = parseInt(req.params.id);
	const body = req.body
	if(system.verifyId(idParam) && idParam > 0){
		const modArtist = system.updateArtist(idParam, body)
		//system.save('./backend/backend.json')
		res.status(200).json(modArtist)
	}
	else{
		next(new resourceNotFoundErrorModule.ResourceNotFoundError())
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
		//system.save('./backend/backend.json')
		res.status(204).json({
		})
	}
	else{
		next(new resourceNotFoundErrorModule.ResourceNotFoundError())
	}
});

module.exports = router;