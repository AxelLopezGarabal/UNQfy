const resourceNotFoundErrorModule = require('../errors/ResourceNotFoundError')

const express = require('express');
const router = express.Router();

const system = require('../backend/mockBBDD')

router.get('/email=:aEmail', (req, res, next) => {
    const email = req.params.aEmail
    const user = system.getUserByEmail(email)
	res.status(200).json(user)
});

router.post('/', (req, res, next) => {
    const body = req.body;
    system.addUser(body);
	res.status(200).json({message: 'ok'})
});

router.put('/follow', (req, res, next) => {
    const body = req.body;
    let user = system.getUserByEmail(body.email);
    let anArtist = system.getArtistByName(body.artistName)
    user.follow(anArtist)
    res.status(200).json({message: ok})
})

module.exports = router;