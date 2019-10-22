
const express = require('express');
const router = express.Router();

const model = '../backend/mockBBDD'

router.get('/:id/lyrics', (req, res, next) => {
	res.status(200).json({
		method: 'GET',
	})
});

module.exports = router;