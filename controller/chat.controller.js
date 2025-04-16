const Chat = require('../model/chat.models');
const { chatValidation } = require('../validations/chat.validation');


const createChat = async (req, res) => {
  try {
    const { error, value } = chatValidation(req.body);
    if (error) {
      return res.status(400).send({ errors: error.details.map((err) => err.message) });
    }

    const {
      title,
      description,
      photo,
      type,
      members_count,
      created_at,
      invite_link,
    } = value;

    const newChat = await Chat.create({
      title,
      description,
      photo,
      type,
      members_count,
      created_at,
      invite_link,
    });

    return res.status(201).send({ message: 'Chat yaratildi', chat: newChat });
  } catch (error) {
    return res.status(500).send({ message: 'Chat yaratishda xatolik', error: error.message });
  }
};

const getAllChats = async (req, res) => {
  try {
    const chats = await Chat.findAll();
    return res.status(200).send(chats);
  } catch (error) {
    return res.status(500).send({ message: 'Chatlarni olishda xatolik', error: error.message });
  }
};

const getChatById = async (req, res) => {
  try {
    const { id } = req.params;
    const chat = await Chat.findByPk(id);
    if (!chat) {
      return res.status(404).send({ message: 'Chat topilmadi' });
    }
    return res.status(200).send(chat);
  } catch (error) {
    return res.status(500).send({ message: 'Chatni olishda xatolik', error: error.message });
  }
};

const updateChat = async (req, res) => {
  try {
    const { id } = req.params;
    const { error, value } = chatValidation(req.body);
    if (error) {
      return res.status(400).send({ errors: error.details.map((err) => err.message) });
    }

    const {
      title,
      description,
      photo,
      type,
      members_count,
      created_at,
      invite_link,
    } = value;

    const chat = await Chat.findByPk(id);
    if (!chat) {
      return res.status(404).send({ message: 'Chat topilmadi' });
    }

    await chat.update(
      {
        title,
        description,
        photo,
        type,
        members_count,
        created_at,
        invite_link,
      },
      { where: { id } }
    );

    return res.status(200).send({ message: 'Chat yangilandi', chat });
  } catch (error) {
    return res.status(500).send({ message: 'Chatni yangilashda xatolik', error: error.message });
  }
};

const deleteChat = async (req, res) => {
  try {
    const { id } = req.params;
    const chat = await Chat.findByPk(id);
    if (!chat) {
      return res.status(404).send({ message: 'Chat topilmadi' });
    }

    await chat.destroy({ where: { id } });
    return res.status(200).send({ message: 'Chat o‘chirildi' });
  } catch (error) {
    return res.status(500).send({ message: 'Chatni o‘chirishda xatolik', error: error.message });
  }
};

module.exports = {
  createChat,
  getAllChats,
  getChatById,
  updateChat,
  deleteChat,
};