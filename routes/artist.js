const express = require('express');
const router = express.Router();

router.post('/', (req, res, next) => {
	res.status(200).json({
		method: 'POST',
	})
});

router.get('/:id', (req, res, next) => {
	res.status(200).json({
		method: 'GET',
	})
});

router.patch('/:id', (req, res, next) => {
	res.status(200).json({
		method: 'GET',
	})
});

router.get('/', (req, res, next) => {
	res.status(200).json({
		method: 'GET',
	})
});

router.delete('/:id', (req, res, next) => {
	res.status(200).json({
		method: 'DELETE',
	})
});

module.exports = router;