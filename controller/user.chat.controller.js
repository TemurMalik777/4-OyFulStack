const { UserChat } = require("../model/user.chat.models");
const { userChatValidation } = require("../validations/user.chat.validation");

const createUserChat = async (req, res) => {
  try {
    const { error } = userChatValidation(req.body);
    if (error) {
      return res.status(400).json({
        message: "Validatsiya xatosi",
        errors: error.details,
      });
    }

    const { userId, chatId, joined_at } = req.body;

    const newUserChat = await UserChat.create({
      userId,
      chatId,
      joined_at,
    });

    return res.status(201).json({
      message: "Foydalanuvchi chatga muvaffaqiyatli qo‘shildi",
      data: newUserChat,
    });
  } catch (error) {
    console.error("Foydalanuvchi chat yaratishda xatolik:", error);
    return res.status(500).json({
      message: "Server xatosi",
      error: error.message,
    });
  }
};

const getAllUserChat = async (req, res) => {
  try {
    const userChats = await UserChat.findAll();
    return res.status(200).json({
      message: "Barcha foydalanuvchi chatlari muvaffaqiyatli olingan",
      data: userChats,
    });
  } catch (error) {
    console.error("Foydalanuvchi chatlarni olishda xatolik:", error);
    return res.status(500).json({
      message: "Server xatosi",
      error: error.message,
    });
  }
};

const getUserChatById = async (req, res) => {
  try {
    const { id } = req.params;
    const userChat = await UserChat.findByPk(id);

    if (!userChat) {
      return res.status(404).json({
        message: "Foydalanuvchi chat topilmadi",
      });
    }

    return res.status(200).json({
      message: "Foydalanuvchi chat muvaffaqiyatli olingan",
      data: userChat,
    });
  } catch (error) {
    console.error("Foydalanuvchi chat olishda xatolik:", error);
    return res.status(500).json({
      message: "Server xatosi",
      error: error.message,
    });
  }
};

const updateUserChat = async (req, res) => {
  try {
    const { id } = req.params;
    const { error } = userChatValidation(req.body);
    if (error) {
      return res.status(400).json({
        message: "Validatsiya xatosi",
        errors: error.details,
      });
    }

    const userChat = await UserChat.findByPk(id);

    if (!userChat) {
      return res.status(404).json({
        message: "Foydalanuvchi chat topilmadi",
      });
    }

    const { userId, chatId, joined_at } = req.body;

    await userChat.update({
      userId,
      chatId,
      joined_at,
    });

    return res.status(200).json({
      message: "Foydalanuvchi chat muvaffaqiyatli yangilandi",
      data: userChat,
    });
  } catch (error) {
    console.error("Foydalanuvchi chat yangilashda xatolik:", error);
    return res.status(500).json({
      message: "Server xatosi",
      error: error.message,
    });
  }
};

const deleteUserChat = async (req, res) => {
  try {
    const { id } = req.params;
    const userChat = await UserChat.findByPk(id);

    if (!userChat) {
      return res.status(404).json({
        message: "Foydalanuvchi chat topilmadi",
      });
    }

    await userChat.destroy();
    return res.status(200).json({
      message: "Foydalanuvchi chat muvaffaqiyatli o‘chirildi",
    });
  } catch (error) {
    console.error("Foydalanuvchi chat o‘chirishda xatolik:", error);
    return res.status(500).json({
      message: "Server xatosi",
      error: error.message,
    });
  }
};

module.exports = {
  createUserChat,
  getAllUserChat,
  getUserChatById,
  updateUserChat,
  deleteUserChat,
};
