const {
  getAllMessage,
  getMessageById,
  updateMessage,
  deleteMessage,
} = require("../controller/message.controller");
const { createMessageEdit } = require("../controller/message.edit.controller");

const router = require("express").Router();

router.post("/", createMessageEdit);
router.get("/", getAllMessage);
router.get("/:id", getMessageById);
router.put("/:id", updateMessage);
router.delete("/:id", deleteMessage);

module.exports = router;
