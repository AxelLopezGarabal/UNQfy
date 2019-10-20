const Joi = require('@hapi/joi')

module.exports = Joi.object({
  name: Joi.string()
    .min(1)
    .required(),

  country: Joi.string()
    .required()
})