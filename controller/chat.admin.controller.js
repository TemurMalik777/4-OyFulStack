const ChatAdmins = require('../model/chat.admin.models');
const { chatAdminsValidation } = require('../validations/chat.admin.validation');

// Create Chat Admin
const createChatAdmin = async (req, res) => {
  try {
    const { error, value } = chatAdminsValidation(req.body);
    if (error) {
      return res.status(400).send({ errors: error.details.map((err) => err.message) });
    }

    const {
      chatId,
      userId,
      can_edit_messages,
      can_delete_message,
      can_add_members,
      can_invite,
      can_pin_messages,
      promoted_at,
    } = value;

    const newChatAdmin = await ChatAdmins.create({
      chatId,
      userId,
      can_edit_messages,
      can_delete_message,
      can_add_members,
      can_invite,
      can_pin_messages,
      promoted_at,
    });

    return res.status(201).send({ message: 'Chat admin yaratildi', chatAdmin: newChatAdmin });
  } catch (error) {
    return res.status(500).send({ message: 'Chat admin yaratishda xatolik', error: error.message });
  }
};

// Get All Chat Admins
const getAllChatAdmins = async (req, res) => {
  try {
    const chatAdmins = await ChatAdmins.findAll();
    return res.status(200).send(chatAdmins);
  } catch (error) {
    return res.status(500).send({ message: 'Chat adminlarni olishda xatolik', error: error.message });
  }
};

// Get Chat Admin by ID
const getChatAdminById = async (req, res) => {
  try {
    const { id } = req.params;
    const chatAdmin = await ChatAdmins.findByPk(id);
    if (!chatAdmin) {
      return res.status(404).send({ message: 'Chat admin topilmadi' });
    }
    return res.status(200).send(chatAdmin);
  } catch (error) {
    return res.status(500).send({ message: 'Chat adminni olishda xatolik', error: error.message });
  }
};

// Update Chat Admin
const updateChatAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const { error, value } = chatAdminsValidation(req.body);
    if (error) {
      return res.status(400).send({ errors: error.details.map((err) => err.message) });
    }

    const {
      chat_id,
      user_id,
      can_edit_messages,
      can_delete_message,
      can_add_members,
      can_invite,
      can_pin_messages,
      promoted_at,
    } = value;

    const chatAdmin = await ChatAdmins.findByPk(id);
    if (!chatAdmin) {
      return res.status(404).send({ message: 'Chat admin topilmadi' });
    }

    await chatAdmin.update(
      {
        chat_id,
        user_id,
        can_edit_messages,
        can_delete_message,
        can_add_members,
        can_invite,
        can_pin_messages,
        promoted_at,
      },
      { where: { id } }
    );

    return res.status(200).send({ message: 'Chat admin yangilandi', chatAdmin });
  } catch (error) {
    return res.status(500).send({ message: 'Chat adminni yangilashda xatolik', error: error.message });
  }
};

// Delete Chat Admin
const deleteChatAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const chatAdmin = await ChatAdmins.findByPk(id);
    if (!chatAdmin) {
      return res.status(404).send({ message: 'Chat admin topilmadi' });
    }

    await chatAdmin.destroy({ where: { id } });
    return res.status(200).send({ message: 'Chat admin o‘chirildi' });
  } catch (error) {
    return res.status(500).send({ message: 'Chat adminni o‘chirishda xatolik', error: error.message });
  }
};

module.exports = {
  createChatAdmin,
  getAllChatAdmins,
  getChatAdminById,
  updateChatAdmin,
  deleteChatAdmin,
};