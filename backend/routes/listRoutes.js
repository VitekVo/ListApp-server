const express = require("express");
const router = express.Router();
const listController = require("../controllers/listController");

router.post("/create", listController.createList);
router.get("/list/:userId", listController.getLists);
router.get("/get/:listId", listController.getListById);
router.put("/update/:listId", listController.updateList);
router.put("/manage/:listId", listController.manageGuests);
router.delete("/delete/:listId", listController.deleteList);

module.exports = router;
