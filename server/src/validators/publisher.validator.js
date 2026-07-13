const Joi = require("joi");

const createPublisherSchema = Joi.object({
  name: Joi.string().trim().required(),
  email: Joi.string().email().allow("", null),
  phone: Joi.string().allow("", null),
  address: Joi.string().allow("", null),
});

const updatePublisherSchema = Joi.object({
  name: Joi.string().trim(),
  email: Joi.string().email().allow("", null),
  phone: Joi.string().allow("", null),
  address: Joi.string().allow("", null),
});

module.exports = {
  createPublisherSchema,
  updatePublisherSchema,
};