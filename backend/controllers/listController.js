const listValidation = require("../validations/listValidation");
const ListDao = require("../dao/listDao");

const createList = async (req, res) => {
  const { error, value } = listValidation.create.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  try {
    const newList = await ListDao.create(value);
    res.status(201).json(newList);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to create list", error: err.message });
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

    if (!updatedList) {
      return res.status(404).json({ message: "List not found" });
    }

    res.status(200).json(updatedList);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to update guest list", error: err.message });
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
