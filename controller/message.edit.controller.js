const { MessageEdit } = require("../model/message.edit.models");
const {
  messageEditValidation,
} = require("../validations/message.edit.validations");

const createMessageEdit = async (req, res) => {
  try {
    const { error, value } = messageEditValidation(req.body);
    if (error) {
      return res.status(400).json({
        message: "Validatsiya xatosi",
        errors: error.details,
      });
    }

    const { messageId, previous_content, new_content, edited_at } = value;

    const newMessageEdit = await MessageEdit.create({
      messageId,
      previous_content,
      new_content,
      edited_at,
    });

    return res.status(201).json({
      message: "Tahrir muvaffaqiyatli yaratildi",
      data: newMessageEdit,
    });
  } catch (error) {
    console.error("Tahrir yaratishda xatolik:", error);
    return res.status(500).json({
      message: "Server xatosi",
      error: error.message,
    });
  }
};

const getAllMessageEdit = async (req, res) => {
  try {
    const messageEdits = await MessageEdit.findAll();
    return res.status(200).json({
      message: "Barcha tahrirlar muvaffaqiyatli olingan",
      data: messageEdits,
    });
  } catch (error) {
    console.error("Tahrirlarni olishda xatolik:", error);
    return res.status(500).json({
      message: "Server xatosi",
      error: error.message,
    });
  }
};

const getMessageEditById = async (req, res) => {
  try {
    const { id } = req.params;
    const messageEdit = await MessageEdit.findByPk(id);

    if (!messageEdit) {
      return res.status(404).json({
        message: "Tahrir topilmadi",
      });
    }

    return res.status(200).json({
      message: "Tahrir muvaffaqiyatli olingan",
      data: messageEdit,
    });
  } catch (error) {
    console.error("Tahrir olishda xatolik:", error);
    return res.status(500).json({
      message: "Server xatosi",
      error: error.message,
    });
  }
};

const updateMessageEdit = async (req, res) => {
  try {
    const { id } = req.params;
    const { error } = messageEditValidation(req.body);
    if (error) {
      return res.status(400).json({
        message: "Validatsiya xatosi",
        errors: error.details,
      });
    }

    const messageEdit = await MessageEdit.findByPk(id);

    if (!messageEdit) {
      return res.status(404).json({
        message: "Tahrir topilmadi",
      });
    }

    const { messageId, previous_content, new_content, edited_at } = req.body;

    await messageEdit.update({
      messageId,
      previous_content,
      new_content,
      edited_at,
    });

    return res.status(200).json({
      message: "Tahrir muvaffaqiyatli yangilandi",
      data: messageEdit,
    });
  } catch (error) {
    console.error("Tahrir yangilashda xatolik:", error);
    return res.status(500).json({
      message: "Server xatosi",
      error: error.message,
    });
  }
};

const deleteMessageEdit = async (req, res) => {
  try {
    const { id } = req.params;
    const messageEdit = await MessageEdit.findByPk(id);

    if (!messageEdit) {
      return res.status(404).json({
        message: "Tahrir topilmadi",
      });
    }

    await messageEdit.destroy();
    return res.status(200).json({
      message: "Tahrir muvaffaqiyatli o‘chirildi",
    });
  } catch (error) {
    console.error("Tahrir o‘chirishda xatolik:", error);
    return res.status(500).json({
      message: "Server xatosi",
      error: error.message,
    });
  }
};

module.exports = {
  createMessageEdit,
  getAllMessageEdit,
  getMessageEditById,
  updateMessageEdit,
  deleteMessageEdit,
};
