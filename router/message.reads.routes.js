const {
  createMessageRead,
  getAllMessageRead,
  getMessageReadById,
  updateMessageRead,
  deleteMessageRead,
} = require("../controller/message.reads.controller");

const router = require("express").Router();

router.post("/", createMessageRead);
router.get("/", getAllMessageRead);
router.get("/:id", getMessageReadById);
router.put("/:id", updateMessageRead);
router.delete("/:id", deleteMessageRead);

module.exports = router;
