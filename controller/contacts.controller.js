const { errorHandler } = require("../helpers/error_handler");
const Contact = require("../model/contacts.model");
const { contactValidation } = require("../validations/contacts.validation");

// Create Contact
const createContact = async (req, res) => {
  try {
    const { error, value } = contactValidation(req.body);
    if (error) {
      return errorHandler(error, res);
    }

    const { display_name, is_blocked, userId } = value;

    const newContact = await Contact.create({ display_name, is_blocked, userId });
    return res
      .status(201)
      .send({ message: "Kontakt yaratildi", contact: newContact });
  } catch (error) {
    return res
      .status(500)
      .send({ message: "Kontakt yaratishda xatolik", error: error.message });
  }
};

// Get All Contacts
const getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.findAll();
    return res.status(200).send(contacts);
  } catch (error) {
    return res
      .status(500)
      .send({ message: "Kontaktlarni olishda xatolik", error: error.message });
  }
};

// Get Contact by ID
const getContactById = async (req, res) => {
  try {
    const { id } = req.params;
    const contact = await Contact.findByPk(id);
    if (!contact) {
      return res.status(404).send({ message: "Kontakt topilmadi" });
    }
    return res.status(200).send(contact);
  } catch (error) {
    return errorHandler(error, res)
  }
};

// Update Contact
const updateContact = async (req, res) => {
  try {
    const { id } = req.params;
    const { error, value } = contactValidation(req.body);
    if (error) {
      return errorHandler(error, res)
    }

    const contact = await Contact.findByPk(id);
    if (!contact) {
      return errorHandler(error, res);
    }

    await contact.update(value, { where: { id } });
    return res.status(200).send({ message: "Kontakt yangilandi", contact });
  } catch (error) {
    return errorHandler(error, res)
  }
};

// Delete Contact
const deleteContact = async (req, res) => {
  try {
    const { id } = req.params;
    const contact = await Contact.findByPk(id);
    if (!contact) {
      return errorHandler(error, res)
    }

    await contact.destroy({ where: { id } });
    return res.status(200).send({ message: "Kontakt o‘chirildi" });
  } catch (error) {
    return errorHandler(error, res)
  }
};

module.exports = {
  createContact,
  getAllContacts,
  getContactById,
  updateContact,
  deleteContact,
};
