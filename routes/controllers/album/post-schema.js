const Joi = require('@hapi/joi')

module.exports = Joi.object({
  artistId: Joi.number().required(),
  name:     Joi.string().min(1).required(),
  year:     Joi.number().required()
})