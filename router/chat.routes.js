const {
  createChat,
  getAllChats,
  getChatById,
  updateChat,
  deleteChat,
} = require("../controller/chat.controller");

const router = require("express").Router();

router.post("/", createChat);
router.get("/", getAllChats);
router.get("/:id", getChatById);
router.put("/:id", updateChat);
router.delete("/:id", deleteChat);

module.exports = router;
