const {
  createMessage,
  getAllMessage,
  getMessageById,
  updateMessage,
  deleteMessage,
} = require("../controller/message.controller");

const router = require("express").Router();

router.post("/", createMessage);
router.get("/", getAllMessage);
router.get("/:id", getMessageById);
router.put("/:id", updateMessage);
router.delete("/:id", deleteMessage);

module.exports = router;
