const {
  createChatAdmin,
  getAllChatAdmins,
  getChatAdminById,
  deleteChatAdmin,
} = require("../controller/chat.admin.controller");

const router = require("express").Router();

router.post("/", createChatAdmin);
router.get("/", getAllChatAdmins);
router.get("/:id", getChatAdminById);
router.put("/:id", deleteChatAdmin);
router.delete("/:id", deleteChatAdmin);

module.exports = router;
