const {
  createUserChat,
  getAllUserChat,
  getUserChatById,
  updateUserChat,
  deleteUserChat,
} = require("../controller/user.chat.controller");

const router = require("express").Router();

router.post("/", createUserChat);
router.get("/", getAllUserChat);
router.get("/:id", getUserChatById);
router.put(":id", updateUserChat);
router.delete(":id", deleteUserChat);

module.exports = router;
