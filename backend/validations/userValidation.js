const Joi = require("joi");

const createUser = Joi.object({
  name: Joi.string().required().min(2).max(50).messages({
    "string.empty": "Name is required.",
    "string.min": "Name must be at least 2 characters long.",
    "string.max": "Name cannot exceed 50 characters.",
  }),
});

const updateUser = Joi.object({
  userId: Joi.string().required().messages({
    "string.empty": "User ID is required.",
  }),
  name: Joi.string().optional().min(2).max(50).messages({
    "string.min": "Name must be at least 2 characters long.",
    "string.max": "Name cannot exceed 50 characters.",
  }),
});

const getUserById = Joi.object({
  userId: Joi.string().required().messages({
    "string.empty": "User ID is required.",
  }),
});

const deleteUser = Joi.object({
  userId: Joi.string().required().messages({
    "string.empty": "User ID is required.",
  }),
});

module.exports = { createUser, updateUser, getUserById, deleteUser };
