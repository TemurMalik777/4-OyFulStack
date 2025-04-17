const Joi = require('joi');

const channelPostValidation = (data) => {
  const schema = Joi.object({
    // channelId: Joi.number().integer().positive().required()
    //   .messages({
    //     'number.base': 'channelId raqam bo‘lishi kerak',
    //     'number.integer': 'channelId butun son bo‘lishi kerak',
    //     'number.positive': 'channelId musbat bo‘lishi kerak',
    //     'any.required': 'channelId majburiy maydon',
    //   }),
    // messageId: Joi.number().integer().positive().required()
    //   .messages({
    //     'number.base': 'messageId raqam bo‘lishi kerak',
    //     'number.integer': 'messageId butun son bo‘lishi kerak',
    //     'number.positive': 'messageId musbat bo‘lishi kerak',
    //     'any.required': 'messageId majburiy maydon',
    //   }),
    views_count: Joi.number().integer().min(0).required()
      .messages({
        'number.base': 'views_count raqam bo‘lishi kerak',
        'number.integer': 'views_count butun son bo‘lishi kerak',
        'number.min': 'views_count 0 dan kichik bo‘lmasligi kerak',
        'any.required': 'views_count majburiy maydon',
      }),
  });

  return schema.validate(data, { abortEarly: false });
};

module.exports = { channelPostValidation };