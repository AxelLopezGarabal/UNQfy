const express = require('express');
const router = express.Router();


router.get('/', (req, res, next) => {
	res.status(200).json({
		method: 'Get',
		message: 'simple GET response'
	})
});

module.exports = router;
