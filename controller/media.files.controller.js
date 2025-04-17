const { MediaFile } = require("../model/media.files.models");
const { mediaFileValidation } = require("..//validations/media.files.validation");

const createMediaFile = async (req, res) => {
  try {
    const { error, value } = mediaFileValidation(req.body);
    if (error) {
      return res.status(400).json({
        message: "Validatsiya xatosi",
        errors: error.details,
      });
    }

    const {
      messageId,
      fileType,
      filePath,
      fileSize,
      mimeType,
      thumbnailPath,
      width,
      height,
      duration,
    } = value;

    const newMediaFile = await MediaFile.create({
      messageId,
      fileType,
      filePath,
      fileSize,
      mimeType,
      thumbnailPath,
      width,
      height,
      duration,
    });

    return res.status(201).json({
      message: "Media fayl muvaffaqiyatli yaratildi",
      data: newMediaFile,
    });
  } catch (error) {
    console.error("Media fayl yaratishda xatolik:", error);
    return res.status(500).json({
      message: "Server xatosi",
      error: error.message,
    });
  }
};

const getAllMediaFile = async (req, res) => {
  try {
    const mediaFiles = await MediaFile.findAll();
    return res.status(200).json({
      message: "Barcha media fayllar muvaffaqiyatli olingan",
      data: mediaFiles,
    });
  } catch (error) {
    console.error("Media fayllarni olishda xatolik:", error);
    return res.status(500).json({
      message: "Server xatosi",
      error: error.message,
    });
  }
};

const getMediaFileById = async (req, res) => {
  try {
    const { id } = req.params;
    const mediaFile = await MediaFile.findByPk(id);

    if (!mediaFile) {
      return res.status(404).json({
        message: "Media fayl topilmadi",
      });
    }

    return res.status(200).json({
      message: "Media fayl muvaffaqiyatli olingan",
      data: mediaFile,
    });
  } catch (error) {
    console.error("Media fayl olishda xatolik:", error);
    return res.status(500).json({
      message: "Server xatosi",
      error: error.message,
    });
  }
};

const updateMediaFile = async (req, res) => {
  try {
    const { id } = req.params;
    const { error } = mediaFileValidation(req.body);
    if (error) {
      return res.status(400).json({
        message: "Validatsiya xatosi",
        errors: error.details,
      });
    }

    const mediaFile = await MediaFile.findByPk(id);

    if (!mediaFile) {
      return res.status(404).json({
        message: "Media fayl topilmadi",
      });
    }

    const {
      messageId,
      fileType,
      filePath,
      fileSize,
      mimeType,
      thumbnailPath,
      width,
      height,
      duration,
    } = req.body;

    await mediaFile.update({
      messageId,
      fileType,
      filePath,
      fileSize,
      mimeType,
      thumbnailPath,
      width,
      height,
      duration,
    });

    return res.status(200).json({
      message: "Media fayl muvaffaqiyatli yangilandi",
      data: mediaFile,
    });
  } catch (error) {
    console.error("Media fayl yangilashda xatolik:", error);
    return res.status(500).json({
      message: "Server xatosi",
      error: error.message,
    });
  }
};

const deleteMediaFile = async (req, res) => {
  try {
    const { id } = req.params;
    const mediaFile = await MediaFile.findByPk(id);

    if (!mediaFile) {
      return res.status(404).json({
        message: "Media fayl topilmadi",
      });
    }

    await mediaFile.destroy();
    return res.status(200).json({
      message: "Media fayl muvaffaqiyatli o‘chirildi",
    });
  } catch (error) {
    console.error("Media fayl o‘chirishda xatolik:", error);
    return res.status(500).json({
      message: "Server xatosi",
      error: error.message,
    });
  }
};

module.exports = {
  createMediaFile,
  getAllMediaFile,
  getMediaFileById,
  updateMediaFile,
  deleteMediaFile,
};
