import Joi from "joi";

const uuidRegex =
  /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;

export const uploadImageSchema = Joi.object({
  image: Joi.string()
    .pattern(/^data:image\/[a-zA-Z]+;base64,[A-Za-z0-9+/=]+$/)
    .required()
    .messages({
      "string.empty": "Image is required",
      "string.pattern.base": "Invalid Base64 image format",
    }),
  customer_code: Joi.string().required().messages({
    "string.empty": "Customer code is required",
    "string.base": "Customer code must be a string",
  }),
  measure_datetime: Joi.date().iso().required().messages({
    "date.base": "Invalid date format, it should be an ISO STRING",
  }),
  measure_type: Joi.string()
    .valid("WATER", "GAS", "water", "gas")
    .required()
    .messages({
      "string.valid": "Measure type must be either WATER or GAS",
      "string.empty": "Measure type is required",
    }),
});

export const confirmReadingSchema = Joi.object({
  measure_uuid: Joi.string().pattern(uuidRegex).required().messages({
    "string.empty": "Measure uuid is required",
    "string.pattern.base": "Invalid UUID format",
  }),
  confirmed_value: Joi.number().required().messages({
    "string.empty": "Confirmed value is required",
  }),
});

export const listConsumersReadingSchema = Joi.object({
  measure_type: Joi.string().valid("WATER", "GAS", "water", "gas").messages({
    "string.valid": "Measure type must be either WATER or GAS",
  }),
});
