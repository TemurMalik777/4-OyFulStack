const {
  createMediaFile,
  getAllMediaFile,
  getMediaFileById,
  updateMediaFile,
  deleteMediaFile,
} = require("../controller/media.files.controller");

const router = require("express").Router();

router.post("/", createMediaFile);
router.get("/", getAllMediaFile);
router.get("/:id", getMediaFileById);
router.put("/:id", updateMediaFile);
router.delete("/:id", deleteMediaFile);

module.exports = router;
