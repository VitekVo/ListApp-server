const listValidation = require("../validations/listValidation");
const ListDao = require("../dao/listDao");

const UserDao = require("../dao/userDao"); // Import user-related database methods

const createList = async (req, res) => {
  const { error, value } = listValidation.create.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  try {
    const { name, host, guests } = value;

    if (guests.includes(host)) {
      return res.status(400).json({
        message: "Your own ID cannot be on the guest list.",
      });
    }

    const foundGuests = await UserDao.getByIds(guests);
    if (foundGuests.length !== guests.length) {
      return res.status(400).json({
        message: "Some of the guest IDs are invalid.",
      });
    }

    const newList = await ListDao.create({ name, host, guests });
    res.status(201).json(newList);
  } catch (err) {
    res.status(500).json({
      message: "Failed to create list",
      error: err.message,
    });
  }
};

const getLists = async (req, res) => {
  const { error, value } = listValidation.getLists.validate(req.params);

  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  try {
    const { userId } = value;
    const lists = await ListDao.getLists(userId);
    res.status(200).json(lists);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to fetch lists", error: err.message });
  }
};

const getListById = async (req, res) => {
  const { error, value } = listValidation.getById.validate(req.params);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  try {
    const list = await ListDao.getById(value.listId);

    if (!list) {
      return res.status(404).json({ message: "List not found" });
    }

    res.status(200).json(list);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to fetch list", error: err.message });
  }
};

const updateList = async (req, res) => {
  const { error, value } = listValidation.update.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  try {
    const listId = req.params.listId;
    const updatedList = await ListDao.updateById(listId, value);

    if (!updatedList) {
      return res.status(404).json({ message: "List not found" });
    }

    res.status(200).json(updatedList);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to update list", error: err.message });
  }
};

const manageGuests = async (req, res) => {
  const { error, value } = listValidation.manageGuests.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  try {
    const { listId } = req.params;
    const { userId, action } = value;

    // Fetch the list to verify the host ID
    const list = await ListDao.getById(listId);
    if (!list) {
      return res.status(404).json({ message: "List not found." });
    }

    // Check if userId is the host ID
    if (list.host === userId) {
      return res.status(400).json({
        message: "Host ID cannot be added to or removed from the guest list.",
      });
    }

    // Check if the userId exists in the User collection
    const userExists = await UserDao.getById(userId); // Assume UserDao has a getById method
    if (!userExists) {
      return res.status(400).json({
        message: "This user ID does not exist.",
      });
    }

    // Perform the add or remove action
    let updatedList;
    if (action === "add") {
      updatedList = await ListDao.addGuest(listId, userId);
    } else if (action === "remove") {
      updatedList = await ListDao.removeGuest(listId, userId);
    } else {
      return res
        .status(400)
        .json({ message: "Invalid action. Use 'add' or 'remove'." });
    }

    res.status(200).json(updatedList);
  } catch (err) {
    res.status(500).json({
      message: "Failed to update guest list",
      error: err.message,
    });
  }
};

const deleteList = async (req, res) => {
  const { error, value } = listValidation.deleteById.validate(req.params);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  try {
    const deletedList = await ListDao.deleteById(value.listId);

    if (!deletedList) {
      return res.status(404).json({ message: "List not found" });
    }

    res.status(200).json({ message: "List deleted successfully", deletedList });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to delete list", error: err.message });
  }
};

module.exports = {
  createList,
  getLists,
  getListById,
  updateList,
  manageGuests,
  deleteList,
};
