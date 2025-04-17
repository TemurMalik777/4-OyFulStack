const {
  createReaction,
  getAllReaction,
  getReactionById,
  updateReaction,
  deleteReaction,
} = require("../controller/reactions.controller");

const router = require("express").Router();

router.post("/", createReaction);
router.get("/", getAllReaction);
router.get("/:id", getReactionById);
router.put("/:id", updateReaction);
router.delete("/:id", deleteReaction);

module.exports = router;
