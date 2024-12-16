const User = require("../models/User");

const create = async (userData) => {
  const newUser = new User(userData);
  return await newUser.save();
};

const getAll = async () => {
  return await User.find();
};

const getById = async (id) => {
  return await User.findById(id);
};

const updateById = async (id, updateData) => {
  return await User.findByIdAndUpdate(id, updateData, { new: true });
};

const deleteById = async (id) => {
  return await User.findByIdAndDelete(id);
};

module.exports = { create, getAll, getById, updateById, deleteById };
