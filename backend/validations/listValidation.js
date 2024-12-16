const Joi = require("joi");

const create = Joi.object({
  name: Joi.string().required(), // List name is required
  host: Joi.string().required(), // Host ID is required
  guests: Joi.array().items(Joi.string()).default([]), // Guests array, defaults to empty
  archived: Joi.boolean().default(false), // Archived defaults to false
});

const update = Joi.object({
  name: Joi.string().optional(), // Optional name field for updates
  archived: Joi.boolean().optional(), // Optional archived status
  guests: Joi.array().items(Joi.string()).optional(), // Optional guests array
});

const manageGuests = Joi.object({
  userId: Joi.string().required(),
  action: Joi.string().valid("add", "remove").required().messages({
    "any.only": "Action must be 'add' or 'remove'.",
    "string.empty": "Action is required.",
  }),
});

const getLists = Joi.object({
  userId: Joi.string().required(), // Validate userId from query
});

const getById = Joi.object({
  listId: Joi.string().required(), // Required list ID for fetching
});

const deleteById = Joi.object({
  listId: Joi.string().required(), // Required list ID for deletion
  // userId: Joi.string().required(), // Required user ID to check permissions
});

module.exports = {
  create,
  update,
  manageGuests,
  getById,
  getLists,
  deleteById,
};
