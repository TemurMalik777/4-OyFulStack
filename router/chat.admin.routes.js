const { createChatAdmin, getAllChatAdmins } = require("../controller/chat.admin.controller")


const router = require("express").Router()

router.post("/", createChatAdmin)
router.get("/", getAllChatAdmins)

module.exports = router