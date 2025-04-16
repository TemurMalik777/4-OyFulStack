const { createChat } = require("../controller/chat.controller");

const router = require("express").Router();

router.post("/", createChat);

module.exports = router;
