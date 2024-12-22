const userValidation = require("../validations/userValidation");
const UserDao = require("../dao/userDao");
const ListDao = require("../dao/listDao");

const createUser = async (req, res) => {
  const { error, value } = userValidation.createUser.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  try {
    const newUser = await UserDao.create(value);
    res.status(201).json(newUser);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to create user", error: err.message });
  }
};

const updateUser = async (req, res) => {
  const { error, value } = userValidation.updateUser.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  try {
    const updatedUser = await UserDao.updateById(value.userId, {
      name: value.name,
    });
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(updatedUser);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to update user", error: err.message });
  }
};

const getUserById = async (req, res) => {
  const { error, value } = userValidation.getUserById.validate(req.params);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  try {
    const user = await UserDao.getById(value.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to fetch user", error: err.message });
  }
};

const deleteUser = async (req, res) => {
  const { error, value } = userValidation.deleteUser.validate(req.params);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  try {
    const { userId } = value;

    await ListDao.deleteByHost(userId);

    await ListDao.removeGuestFromLists(userId);

    const deletedUser = await UserDao.deleteById(userId);
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "User and associated lists updated successfully.",
      deletedUser,
    });
  } catch (err) {
    res.status(500).json({
      message: "Failed to delete user and update lists",
      error: err.message,
    });
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await UserDao.getAll();
    res.status(200).json(users);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to fetch users", error: err.message });
  }
};

module.exports = { createUser, updateUser, getUserById, deleteUser, getUsers };
