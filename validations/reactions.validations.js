const Joi = require('joi');

const reactionValidation = (data) => {
  const schema = Joi.object({
    // messageId: Joi.number().integer().positive().required()
    //   .messages({
    //     'number.base': 'messageId raqam bo‘lishi kerak',
    //     'number.integer': 'messageId butun son bo‘lishi kerak',
    //     'number.positive': 'messageId musbat bo‘lishi kerak',
    //     'any.required': 'messageId majburiy maydon',
    //   }),
    // userId: Joi.number().integer().positive().required()
    //   .messages({
    //     'number.base': 'userId raqam bo‘lishi kerak',
    //     'number.integer': 'userId butun son bo‘lishi kerak',
    //     'number.positive': 'userId musbat bo‘lishi kerak',
    //     'any.required': 'userId majburiy maydon',
    //   }),
    emoji: Joi.string().min(1).max(10).required()
      .messages({
        'string.base': 'emoji matn bo‘lishi kerak',
        'string.min': 'emoji kamida 1 belgi bo‘lishi kerak',
        'string.max': 'emoji 10 belgidan uzun bo‘lmasligi kerak',
        'any.required': 'emoji majburiy maydon',
      }),
    reacted_at: Joi.date().required()
      .messages({
        'date.base': 'reacted_at sana bo‘lishi kerak',
        'any.required': 'reacted_at majburiy maydon',
      }),
  });

  return schema.validate(data, { abortEarly: false });
};

module.exports = { reactionValidation };