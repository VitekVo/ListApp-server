const itemValidation = require("../validations/itemValidation");
const ListDao = require("../dao/listDao");

const addItem = async (req, res) => {
  const { error, value } = itemValidation.addItem.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  try {
    const { listId } = req.params;

    const updatedList = await ListDao.addItem(listId, value);
    if (!updatedList) {
      return res.status(404).json({ message: "List not found." });
    }

    res.status(200).json(updatedList);
  } catch (err) {
    res.status(500).json({ message: "Failed to add item", error: err.message });
  }
};

const updateItem = async (req, res) => {
  const { error, value } = itemValidation.updateItem.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  try {
    const { listId } = req.params;
    const updatedList = await ListDao.updateItem(
      listId,
      value.itemId,
      value.checked
    );

    if (!updatedList) {
      return res.status(404).json({ message: "List or item not found." });
    }

    res.status(200).json(updatedList);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to update item", error: err.message });
  }
};

const removeItem = async (req, res) => {
  try {
    const { listId, itemId } = req.params;
    const updatedList = await ListDao.removeItem(listId, itemId);
    if (!updatedList) {
      return res.status(404).json({ message: "List or item not found." });
    }

    res.status(200).json(updatedList);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to remove item", error: err.message });
  }
};

module.exports = { addItem, updateItem, removeItem };
