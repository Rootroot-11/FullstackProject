const Joi = require('joi');

const createDeviceValidator = Joi.object({
    name: Joi
        .string()
        .alphanum()
        .min(2)
        .max(30)
        .trim()
        .required(),
    price: Joi
        .number()
        .required(),
    rating: Joi
        .number()
        .max(10),
    type: Joi
        .string(),
    brand: Joi
        .string(),
    statusOnMagazine: Joi
        .boolean(),
    email: Joi
        .string()
});

module.exports = {createDeviceValidator};

