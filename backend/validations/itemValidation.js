const Joi = require("joi");

const addItem = Joi.object({
  name: Joi.string().required().min(1).max(100).messages({
    "string.empty": "Item name is required.",
    "string.min": "Item name must be at least 1 character.",
    "string.max": "Item name must not exceed 100 characters.",
  }),
  quantity: Joi.number().integer().positive().required().messages({
    "number.base": "Quantity must be a number.",
    "number.positive": "Quantity must be a positive number.",
    "number.integer": "Quantity must be an integer.",
    "any.required": "Quantity is required.",
  }),
});

const updateItem = Joi.object({
  itemId: Joi.string().required().messages({
    "string.empty": "Item ID is required.",
  }),
  name: Joi.string().optional().min(1).max(100).messages({
    "string.min": "Item name must be at least 1 character.",
    "string.max": "Item name must not exceed 100 characters.",
  }),
  quantity: Joi.number().integer().positive().optional().messages({
    "number.base": "Quantity must be a number.",
    "number.positive": "Quantity must be a positive number.",
    "number.integer": "Quantity must be an integer.",
  }),
  checked: Joi.boolean()
    .optional()
    .messages({
      "boolean.base": "Checked must be a boolean value.",
    })
    .required()
    .messages({
      "any.required": "Item data is required.",
    }),
});

module.exports = { addItem, updateItem };
