const {
  createContact,
  getAllContacts,
  getContactById,
  updateContact,
  deleteContact,
} = require("../controller/contacts.controller");

const router = require("express").Router();

router.post("/", createContact);
router.get("/", getAllContacts);
router.get("/:id", getContactById);
router.put("/:id", updateContact);
router.delete("/:id", deleteContact);

module.exports = router;
