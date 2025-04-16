const Channel = require('../model/chanels.models');
const { channelValidation } = require('../validations/chanels.validation');

// Create Channel
const createChannel = async (req, res) => {
  try {
    const { error, value } = channelValidation(req.body);
    if (error) {
      return res.status(400).send({ errors: error.details.map((err) => err.message) });
    }

    const { chatId, is_verified, subscribers_count } = value;

    const newChannel = await Channel.create({
      chatId,
      is_verified,
      subscribers_count,
    });

    return res.status(201).send({ message: 'Kanal yaratildi', channel: newChannel });
  } catch (error) {
    return res.status(500).send({ message: 'Kanal yaratishda xatolik', error: error.message });
  }
};

// Get All Channels
const getAllChannels = async (req, res) => {
  try {
    const channels = await Channel.findAll();
    return res.status(200).send(channels);
  } catch (error) {
    return res.status(500).send({ message: 'Kanallarni olishda xatolik', error: error.message });
  }
};

// Get Channel by ID
const getChannelById = async (req, res) => {
  try {
    const { id } = req.params;
    const channel = await Channel.findByPk(id);
    if (!channel) {
      return res.status(404).send({ message: 'Kanal topilmadi' });
    }
    return res.status(200).send(channel);
  } catch (error) {
    return res.status(500).send({ message: 'Kanalni olishda xatolik', error: error.message });
  }
};

// Update Channel
const updateChannel = async (req, res) => {
  try {
    const { id } = req.params;
    const { error, value } = channelValidation(req.body);
    if (error) {
      return res.status(400).send({ errors: error.details.map((err) => err.message) });
    }

    const { chat_id, is_verified, subscribers_count } = value;

    const channel = await Channel.findByPk(id);
    if (!channel) {
      return res.status(404).send({ message: 'Kanal topilmadi' });
    }

    await channel.update(
      {
        chat_id,
        is_verified,
        subscribers_count,
      },
      { where: { id } }
    );

    return res.status(200).send({ message: 'Kanal yangilandi', channel });
  } catch (error) {
    return res.status(500).send({ message: 'Kanalni yangilashda xatolik', error: error.message });
  }
};

// Delete Channel
const deleteChannel = async (req, res) => {
  try {
    const { id } = req.params;
    const channel = await Channel.findByPk(id);
    if (!channel) {
      return res.status(404).send({ message: 'Kanal topilmadi' });
    }

    await channel.destroy({ where: { id } });
    return res.status(200).send({ message: 'Kanal o‘chirildi' });
  } catch (error) {
    return res.status(500).send({ message: 'Kanalni o‘chirishda xatolik', error: error.message });
  }
};

module.exports = {
  createChannel,
  getAllChannels,
  getChannelById,
  updateChannel,
  deleteChannel,
};