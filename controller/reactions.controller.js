const { Reaction } = require("../model/reactions.models");
const { reactionValidation } = require("../validations/reactions.validations");

const createReaction = async (req, res) => {
  try {
    const { error } = reactionValidation(req.body);
    if (error) {
      return res.status(400).json({
        message: "Validatsiya xatosi",
        errors: error.details,
      });
    }

    const { messageId, userId, emoji, reacted_at } = req.body;

    const newReaction = await Reaction.create({
      messageId,
      userId,
      emoji,
      reacted_at,
    });

    return res.status(201).json({
      message: "Reaksiya muvaffaqiyatli qo‘shildi",
      data: newReaction,
    });
  } catch (error) {
    console.error("Reaksiya yaratishda xatolik:", error);
    return res.status(500).json({
      message: "Server xatosi",
      error: error.message,
    });
  }
};

const getAllReaction = async (req, res) => {
  try {
    const reactions = await Reaction.findAll();
    return res.status(200).json({
      message: "Barcha reaksiyalar muvaffaqiyatli olingan",
      data: reactions,
    });
  } catch (error) {
    console.error("Reaksiyalarni olishda xatolik:", error);
    return res.status(500).json({
      message: "Server xatosi",
      error: error.message,
    });
  }
};

const getReactionById = async (req, res) => {
  try {
    const { id } = req.params;
    const reaction = await Reaction.findByPk(id);

    if (!reaction) {
      return res.status(404).json({
        message: "Reaksiya topilmadi",
      });
    }

    return res.status(200).json({
      message: "Reaksiya muvaffaqiyatli olingan",
      data: reaction,
    });
  } catch (error) {
    console.error("Reaksiya olishda xatolik:", error);
    return res.status(500).json({
      message: "Server xatosi",
      error: error.message,
    });
  }
};

const updateReaction = async (req, res) => {
  try {
    const { id } = req.params;
    const { error } = reactionValidation(req.body);
    if (error) {
      return res.status(400).json({
        message: "Validatsiya xatosi",
        errors: error.details,
      });
    }

    const reaction = await Reaction.findByPk(id);

    if (!reaction) {
      return res.status(404).json({
        message: "Reaksiya topilmadi",
      });
    }

    const { messageId, userId, emoji, reacted_at } = req.body;

    await reaction.update({
      messageId,
      userId,
      emoji,
      reacted_at,
    });

    return res.status(200).json({
      message: "Reaksiya muvaffaqiyatli yangilandi",
      data: reaction,
    });
  } catch (error) {
    console.error("Reaksiya yangilashda xatolik:", error);
    return res.status(500).json({
      message: "Server xatosi",
      error: error.message,
    });
  }
};

const deleteReaction = async (req, res) => {
  try {
    const { id } = req.params;
    const reaction = await Reaction.findByPk(id);

    if (!reaction) {
      return res.status(404).json({
        message: "Reaksiya topilmadi",
      });
    }

    await reaction.destroy();
    return res.status(200).json({
      message: "Reaksiya muvaffaqiyatli o‘chirildi",
    });
  } catch (error) {
    console.error("Reaksiya o‘chirishda xatolik:", error);
    return res.status(500).json({
      message: "Server xatosi",
      error: error.message,
    });
  }
};

module.exports = {
  createReaction,
  getAllReaction,
  getReactionById,
  updateReaction,
  deleteReaction,
};
