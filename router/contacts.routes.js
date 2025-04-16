const { createContact, getAllContacts } = require("../controller/contacts.controller");

const router = require("express").Router();

router.post("/", createContact);
router.get("/", getAllContacts)

module.exports = router