
const express = require('express');
const router = express.Router();

router.post('/', (req, res, next) => {
	res.status(200).json({
		method: 'POST',
		shouldHave: 'a body'
	})
});

router.get('/:id', (req, res, next) => {
	res.status(200).json({
		method: 'GET',
		shouldHave: 'param en la URL'
	})
});

router.get('/', (req, res, next) => {
	res.status(200).json({
		method: 'GET',
		shouldHave: 'a body'
	})
});

router.patch('/:id', (req, res, next) => {
	res.status(200).json({
		method: 'DELETE',
		shouldHave: 'param en la URL'
	})
});

router.delete('/:id', (req, res, next) => {
	res.status(200).json({
		method: 'DELETE',
		shouldHave: 'param en la URL'
	})
});

module.exports = router;