const { createChannel } = require("../controller/channels.controller")



const router = require("express").Router()

router.post("/", createChannel)

module.exports = router