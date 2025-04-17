const Joi = require('joi');

const messageValidation = (data) => {
  const schema = Joi.object({
    chatId: Joi.number().integer().positive().required(),
    reply_to_messages: Joi.number().integer().positive().allow(null)
      .messages({
        'number.base': 'reply_to_messages raqam bo‘lishi kerak',
        'number.integer': 'reply_to_messages butun son bo‘lishi kerak',
        'number.positive': 'reply_to_messages musbat bo‘lishi kerak',
      }),
    userId: Joi.number().integer().positive().required()
      .messages({
        'number.base': 'userId raqam bo‘lishi kerak',
        'number.integer': 'userId butun son bo‘lishi kerak',
        'number.positive': 'userId musbat bo‘lishi kerak',
        'any.required': 'userId majburiy maydon',
      }),
    content: Joi.string().min(1).max(10000).required()
      .messages({
        'string.base': 'content matn bo‘lishi kerak',
        'string.min': 'content kamida 1 belgi bo‘lishi kerak',
        'string.max': 'content 10000 belgidan uzun bo‘lmasligi kerak',
        'any.required': 'content majburiy maydon',
      }),
    isEdited: Joi.boolean().default(false)
      .messages({
        'boolean.base': 'isEdited true yoki false bo‘lishi kerak',
      }),
    isDeleted: Joi.boolean().default(false)
      .messages({
        'boolean.base': 'isDeleted true yoki false bo‘lishi kerak',
      }),
    isPinned: Joi.boolean().default(false)
      .messages({
        'boolean.base': 'isPinned true yoki false bo‘lishi kerak',
      }),
  });

  return schema.validate(data, { abortEarly: false });
};

module.exports = { messageValidation };