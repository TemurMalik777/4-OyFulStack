const { MessageRead } = require("../model/message.reads.models");
const {
  messageReadValidation,
} = require("..//validations/message.reads.validation");

const createMessageRead = async (req, res) => {
  try {
    const { error, value } = messageReadValidation(req.body);
    if (error) {
      return res.status(400).json({
        message: "Validatsiya xatosi",
        errors: error.details,
      });
    }

    const { messageId, userId, read_at } = value;

    const newMessageRead = await MessageRead.create({
      messageId,
      userId,
      read_at,
    });

    return res.status(201).json({
      message: "Xabar o‘qilganligi muvaffaqiyatli qayd etildi",
      data: newMessageRead,
    });
  } catch (error) {
    console.error("Xabar o‘qilganligini qayd etishda xatolik:", error);
    return res.status(500).json({
      message: "Server xatosi",
      error: error.message,
    });
  }
};

const getAllMessageRead = async (req, res) => {
  try {
    const messageReads = await MessageRead.findAll();
    return res.status(200).json({
      message: "Barcha xabar o‘qilganliklari muvaffaqiyatli olingan",
      data: messageReads,
    });
  } catch (error) {
    console.error("Xabar o‘qilganliklarini olishda xatolik:", error);
    return res.status(500).json({
      message: "Server xatosi",
      error: error.message,
    });
  }
};

const getMessageReadById = async (req, res) => {
  try {
    const { id } = req.params;
    const messageRead = await MessageRead.findByPk(id);

    if (!messageRead) {
      return res.status(404).json({
        message: "Xabar o‘qilganligi topilmadi",
      });
    }

    return res.status(200).json({
      message: "Xabar o‘qilganligi muvaffaqiyatli olingan",
      data: messageRead,
    });
  } catch (error) {
    console.error("Xabar o‘qilganligini olishda xatolik:", error);
    return res.status(500).json({
      message: "Server xatosi",
      error: error.message,
    });
  }
};

const updateMessageRead = async (req, res) => {
  try {
    const { id } = req.params;
    const { error } = messageReadValidation(req.body);
    if (error) {
      return res.status(400).json({
        message: "Validatsiya xatosi",
        errors: error.details,
      });
    }

    const messageRead = await MessageRead.findByPk(id);

    if (!messageRead) {
      return res.status(404).json({
        message: "Xabar o‘qilganligi topilmadi",
      });
    }

    const { messageId, userId, read_at } = req.body;

    await messageRead.update({
      messageId,
      userId,
      read_at,
    });

    return res.status(200).json({
      message: "Xabar o‘qilganligi muvaffaqiyatli yangilandi",
      data: messageRead,
    });
  } catch (error) {
    console.error("Xabar o‘qilganligini yangilashda xatolik:", error);
    return res.status(500).json({
      message: "Server xatosi",
      error: error.message,
    });
  }
};

const deleteMessageRead = async (req, res) => {
  try {
    const { id } = req.params;
    const messageRead = await MessageRead.findByPk(id);

    if (!messageRead) {
      return res.status(404).json({
        message: "Xabar o‘qilganligi topilmadi",
      });
    }

    await messageRead.destroy();
    return res.status(200).json({
      message: "Xabar o‘qilganligi muvaffaqiyatli o‘chirildi",
    });
  } catch (error) {
    console.error("Xabar o‘qilganligini o‘chirishda xatolik:", error);
    return res.status(500).json({
      message: "Server xatosi",
      error: error.message,
    });
  }
};

module.exports = {
  createMessageRead,
  getAllMessageRead,
  getMessageReadById,
  updateMessageRead,
  deleteMessageRead,
};
