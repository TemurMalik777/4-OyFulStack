const { createChannelPost, getAllChannelPost, getChannelPostById, updateChannelPost, deleteChannelPost } = require("../controller/channels.post.controller")



const router = require("express").Router()

router.post("/", createChannelPost)
router.get("/",  getAllChannelPost)
router.get("/:id", getChannelPostById)
router.put("/:id", updateChannelPost)
router.delete("/:id", deleteChannelPost)

module.exports = router