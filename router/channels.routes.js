const {
  createChannel,
  getAllChannels,
  getChannelById,
  updateChannel,
  deleteChannel,
} = require("../controller/channels.controller");

const router = require("express").Router();

router.post("/", createChannel);
router.get("/", getAllChannels);
router.get("/:id", getChannelById);
router.put("/:id", updateChannel);
router.delete("/:id", deleteChannel);

module.exports = router;
