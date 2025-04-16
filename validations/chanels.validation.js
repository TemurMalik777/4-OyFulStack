const Joi = require('joi');

const channelValidation = (data) => {
  const schema = Joi.object({
    chatId: Joi.number().integer().required(),
    is_verified: Joi.boolean()
      .default(false)
      .messages({
        'boolean.base': 'is_verified true yoki false bo‘lishi kerak',
      }),
    subscribers_count: Joi.number()
      .integer()
      .min(0)
      .default(0)
      .messages({
        'number.base': 'Subscribers count raqam bo‘lishi kerak',
        'number.integer': 'Subscribers count butun son bo‘lishi kerak',
        'number.min': 'Subscribers count 0 dan kichik bo‘lmasligi kerak',
      }),
  });

  return schema.validate(data, { abortEarly: false });
};

module.exports = { channelValidation };