const Joi = require('joi');

const messageReadValidation = (data) => {
  const schema = Joi.object({
    messageId: Joi.number().integer().positive().required()
      .messages({
        'number.base': 'messageId raqam bo‘lishi kerak',
        'number.integer': 'messageId butun son bo‘lishi kerak',
        'number.positive': 'messageId musbat bo‘lishi kerak',
        'any.required': 'messageId majburiy maydon',
      }),
    userId: Joi.number().integer().positive().required()
      .messages({
        'number.base': 'userId raqam bo‘lishi kerak',
        'number.integer': 'userId butun son bo‘lishi kerak',
        'number.positive': 'userId musbat bo‘lishi kerak',
        'any.required': 'userId majburiy maydon',
      }),
    read_at: Joi.date().required()
      .messages({
        'date.base': 'read_at sana bo‘lishi kerak',
        'any.required': 'read_at majburiy maydon',
      }),
  });

  return schema.validate(data, { abortEarly: false });
};

module.exports = { messageReadValidation };