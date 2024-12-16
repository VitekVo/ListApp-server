const express = require("express");
const router = express.Router();
const itemController = require("../controllers/itemController");

router.post("/add/:listId", itemController.addItem);

router.put("/update/:listId", itemController.updateItem);

router.delete("/remove/:listId/item/:itemId", itemController.removeItem);

module.exports = router;
