const { ChannelPost } = require("../model/channel.post.models");
const {
  channelPostValidation,
} = require("../validations/channel.post.validation");

const createChannelPost = async (req, res) => {
  try {
    const { error, value } = channelPostValidation(req.body);
    if (error) {
      return res.status(400).json({
        message: "Validatsiya xatosi",
        errors: error.details,
      });
    }

    const { channelId, messageId, views_count } = value;

    const newChannelPost = await ChannelPost.create({
      channelId,
      messageId,
      views_count,
    });

    return res.status(201).json({
      message: "Kanal post muvaffaqiyatli yaratildi",
      data: newChannelPost,
    });
  } catch (error) {
    console.error("Kanal post yaratishda xatolik:", error);
    return res.status(500).json({
      message: "Server xatosi",
      error: error.message,
    });
  }
};

const getAllChannelPost = async (req, res) => {
  try {
    const channelPosts = await ChannelPost.findAll();
    return res.status(200).json({
      message: "Barcha kanal postlari muvaffaqiyatli olingan",
      data: channelPosts,
    });
  } catch (error) {
    console.error("Kanal postlarni olishda xatolik:", error);
    return res.status(500).json({
      message: "Server xatosi",
      error: error.message,
    });
  }
};

const getChannelPostById = async (req, res) => {
  try {
    const { id } = req.params;
    const channelPost = await ChannelPost.findByPk(id);

    if (!channelPost) {
      return res.status(404).json({
        message: "Kanal post topilmadi",
      });
    }

    return res.status(200).json({
      message: "Kanal post muvaffaqiyatli olingan",
      data: channelPost,
    });
  } catch (error) {
    console.error("Kanal post olishda xatolik:", error);
    return res.status(500).json({
      message: "Server xatosi",
      error: error.message,
    });
  }
};

const updateChannelPost = async (req, res) => {
  try {
    const { id } = req.params;
    const { error } = channelPostValidation(req.body);
    if (error) {
      return res.status(400).json({
        message: "Validatsiya xatosi",
        errors: error.details,
      });
    }

    const channelPost = await ChannelPost.findByPk(id);

    if (!channelPost) {
      return res.status(404).json({
        message: "Kanal post topilmadi",
      });
    }

    const { channelId, messageId, views_count } = req.body;

    await channelPost.update({
      channelId,
      messageId,
      views_count,
    });

    return res.status(200).json({
      message: "Kanal post muvaffaqiyatli yangilandi",
      data: channelPost,
    });
  } catch (error) {
    console.error("Kanal post yangilashda xatolik:", error);
    return res.status(500).json({
      message: "Server xatosi",
      error: error.message,
    });
  }
};

const deleteChannelPost = async (req, res) => {
  try {
    const { id } = req.params;
    const channelPost = await ChannelPost.findByPk(id);

    if (!channelPost) {
      return res.status(404).json({
        message: "Kanal post topilmadi",
      });
    }

    await channelPost.destroy();
    return res.status(200).json({
      message: "Kanal post muvaffaqiyatli o‘chirildi",
    });
  } catch (error) {
    console.error("Kanal post o‘chirishda xatolik:", error);
    return res.status(500).json({
      message: "Server xatosi",
      error: error.message,
    });
  }
};

module.exports = {
  createChannelPost,
  getAllChannelPost,
  getChannelPostById,
  updateChannelPost,
  deleteChannelPost,
};
