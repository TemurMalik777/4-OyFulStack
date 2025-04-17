const { Message } = require("../model/message.modesl");
const { messageValidation } = require("../validations/message.validation");

const createMessage = async (req, res) => {
  try {
    // Validatsiya
    const { error, value } = messageValidation(req.body);
    if (error) {
      return res.status(400).json({
        message: "Validatsiya xatosi",
        errors: error.details,
      });
    }

    const {
      chatId,
      reply_to_messages,
      userId,
      content,
      isEdited,
      isDeleted,
      isPinned,
    } = value;

    const newMessage = await Message.create({
      chatId,
      reply_to_messages,
      userId,
      content,
      isEdited,
      isDeleted,
      isPinned,
    });

    return res.status(201).json({
      message: "Xabar muvaffaqiyatli yaratildi",
      data: newMessage,
    });
  } catch (error) {
    console.error("Xabar yaratishda xatolik:", error);
    return res.status(500).json({
      message: "Server xatosi",
      error: error.message,
    });
  }
};

const getAllMessage = async (req, res) => {
  try {
    const messages = await Message.findAll();
    return res.status(200).json({
      message: "Barcha xabarlar muvaffaqiyatli olingan",
      data: messages,
    });
  } catch (error) {
    console.error("Xabarlarni olishda xatolik:", error);
    return res.status(500).json({
      message: "Server xatosi",
      error: error.message,
    });
  }
};

const getMessageById = async (req, res) => {
  try {
    const { id } = req.params;
    const message = await Message.findByPk(id);

    if (!message) {
      return res.status(404).json({
        message: "Xabar topilmadi",
      });
    }

    return res.status(200).json({
      message: "Xabar muvaffaqiyatli olingan",
      data: message,
    });
  } catch (error) {
    console.error("Xabar olishda xatolik:", error);
    return res.status(500).json({
      message: "Server xatosi",
      error: error.message,
    });
  }
};

const updateMessage = async (req, res) => {
  try {
    const { id } = req.params;
    const { error } = messageValidation(req.body);
    if (error) {
      return res.status(400).json({
        message: "Validatsiya xatosi",
        errors: error.details,
      });
    }

    const message = await Message.findByPk(id);

    if (!message) {
      return res.status(404).json({
        message: "Xabar topilmadi",
      });
    }

    const {
      chatId,
      reply_to_messages,
      userId,
      content,
      isEdited,
      isDeleted,
      isPinned,
    } = req.body;

    await message.update({
      chatId,
      reply_to_messages,
      userId,
      content,
      isEdited,
      isDeleted,
      isPinned,
    });

    return res.status(200).json({
      message: "Xabar muvaffaqiyatli yangilandi",
      data: message,
    });
  } catch (error) {
    console.error("Xabar yangilashda xatolik:", error);
    return res.status(500).json({
      message: "Server xatosi",
      error: error.message,
    });
  }
};

const deleteMessage = async (req, res) => {
  try {
    const { id } = req.params;
    const message = await Message.findByPk(id);

    if (!message) {
      return res.status(404).json({
        message: "Xabar topilmadi",
      });
    }

    await message.destroy();
    return res.status(200).json({
      message: "Xabar muvaffaqiyatli o‘chirildi",
    });
  } catch (error) {
    console.error("Xabar o‘chirishda xatolik:", error);
    return res.status(500).json({
      message: "Server xatosi",
      error: error.message,
    });
  }
};

module.exports = {
  createMessage,
  getAllMessage,
  getMessageById,
  updateMessage,
  deleteMessage,
};
