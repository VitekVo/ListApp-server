const List = require("../models/List");

const create = async (listData) => {
  const newList = new List(listData);
  return await newList.save();
};

const getLists = async (userId) => {
  return await List.find({
    $or: [{ host: userId }, { guests: userId }],
  });
};

const getById = async (id) => {
  return await List.findById(id);
};

const updateById = async (id, updateData) => {
  return await List.findByIdAndUpdate(id, updateData, { new: true });
};

const addGuest = async (listId, userId) => {
  return await List.findByIdAndUpdate(
    listId,
    { $addToSet: { guests: userId } }, // $addToSet prevents duplicates
    { new: true }
  );
};

const removeGuest = async (listId, userId) => {
  return await List.findByIdAndUpdate(
    listId,
    { $pull: { guests: userId } }, // $pull removes the specified userId
    { new: true }
  );
};

const deleteById = async (id) => {
  return await List.findByIdAndDelete(id);
};

const addItem = async (listId, itemData) => {
  return await List.findByIdAndUpdate(
    listId,
    { $push: { items: itemData } },
    { new: true }
  );
};

const updateItem = async (listId, itemId, checked) => {
  return await List.findOneAndUpdate(
    { _id: listId, "items._id": itemId },
    { $set: { "items.$.checked": checked } },
    { new: true }
  );
};

const removeItem = async (listId, itemId) => {
  return await List.findByIdAndUpdate(
    listId,
    { $pull: { items: { _id: itemId } } },
    { new: true }
  );
};

const deleteByHost = async (userId) => {
  return await List.deleteMany({ host: userId });
};

const removeGuestFromLists = async (userId) => {
  return await List.updateMany(
    { guests: userId },
    { $pull: { guests: userId } }
  );
};

module.exports = {
  create,
  getLists,
  getById,
  updateById,
  addGuest,
  removeGuest,
  deleteById,
  addItem,
  updateItem,
  removeItem,
  deleteByHost,
  removeGuestFromLists,
};
