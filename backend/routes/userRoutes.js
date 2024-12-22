const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.post("/create", userController.createUser);
router.get("/list", userController.getUsers);
router.get("/get/:userId", userController.getUserById);
router.put("/update", userController.updateUser);
router.delete("/delete/:userId", userController.deleteUser);

module.exports = router;
