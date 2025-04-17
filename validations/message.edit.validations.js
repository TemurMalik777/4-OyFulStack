const Joi = require('joi');

const messageEditValidation = (data) => {
  const schema = Joi.object({
    messageId: Joi.number().integer().positive().required(),
    previous_content: Joi.string().min(1).max(10000).required()
      .messages({
        'string.base': 'previous_content matn bo‘lishi kerak',
        'string.min': 'previous_content kamida 1 belgi bo‘lishi kerak',
        'string.max': 'previous_content 10000 belgidan uzun bo‘lmasligi kerak',
        'any.required': 'previous_content majburiy maydon',
      }),
    new_content: Joi.string().min(1).max(10000).required()
      .messages({
        'string.base': 'new_content matn bo‘lishi kerak',
        'string.min': 'new_content kamida 1 belgi bo‘lishi kerak',
        'string.max': 'new_content 10000 belgidan uzun bo‘lmasligi kerak',
        'any.required': 'new_content majburiy maydon',
      }),
    edited_at: Joi.date().required()
      .messages({
        'date.base': 'edited_at sana bo‘lishi kerak',
        'any.required': 'edited_at majburiy maydon',
      }),
  });

  return schema.validate(data, { abortEarly: false });
};

module.exports = { messageEditValidation };