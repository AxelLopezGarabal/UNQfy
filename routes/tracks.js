const badRequestErrorModule = require('../errors/BadRequestError')
const resourceAlreadyExistErrorModule = require('../errors/ResourceAlreadyExistError')
const resourceNotFoundErrorModule = require('../errors/ResourceNotFoundError')

const express = require('express');
const router = express.Router();

const model = require('../backend/mockBBDD')

router.post('/', (req, res, next)=> {
	const albumId = parseInt(req.body.albumId);
	const trackname = req.body.name;
	const duration = req.body.duration;
	const genres = req.body.genres
	if(model.verifyId(albumId) && albumId > 0){
		const track = model.addTrack(albumId, {name: trackname, duration:duration, genres: genres})
		const album = model.getAlbumById(albumId)
		res.status(200).json({
			method: 'GET',
			body: {
				track: track,
				album: album
			}

		})
	}
	else{
		next(new resourceNotFoundErrorModule.ResourceNotFoundError())
	}
});

router.get('/:id/lyrics', (req, res, next) => {
	const idParam = parseInt(req.params.id);
	const aritistname = req.body.aritistname;
	if(model.verifyId(idParam) && idParam > 0){
		const track = model.getTrackById(idParam)
		if(track.lyrics == ''){
			model.getLyiricsFor(aritistname, track.name)
			res.status(200).json({
				method: 'GET',
				lyrics: "try again later"
			})
		}
		else{
			res.status(200).json({
				method: 'GET',
				lyrics: track.lyrics
			})
		}
	}
	else{
		next(new resourceNotFoundErrorModule.ResourceNotFoundError())
	}
});

module.exports = router;