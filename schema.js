
const Joi = require("joi");

module.exports.listingSchema = Joi.object({
  listing: Joi.object({
    title: Joi.string().required(),
    price: Joi.number().required().min(0),
    description: Joi.string().required(),
    location: Joi.string().required(),
    country: Joi.string().required(),
    // image ko optional rakho
    image: Joi.string().allow("", null)
  }).required()
});

module.exports.reviewschema=Joi.object({
    review:Joi.object({
rating:Joi.string().required().min(1).max(5),
comment:Joi.string().required(),
    }).required(),
})