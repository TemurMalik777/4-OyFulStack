const Joi = require('joi');

const mediaFileValidation = (data) => {
  const schema = Joi.object({
    messageId: Joi.number().integer().positive().required(),
    fileType: Joi.string().required()
      .messages({
        'string.base': 'fileType matn bo‘lishi kerak',
        'any.required': 'fileType majburiy maydon',
      }),
    filePath: Joi.string().required()
      .messages({
        'string.base': 'filePath matn bo‘lishi kerak',
        'any.required': 'filePath majburiy maydon',
      }),
    fileSize: Joi.number().integer().positive().required()
      .messages({
        'number.base': 'fileSize raqam bo‘lishi kerak',
        'number.integer': 'fileSize butun son bo‘lishi kerak',
        'number.positive': 'fileSize musbat bo‘lishi kerak',
        'any.required': 'fileSize majburiy maydon',
      }),
    mimeType: Joi.string().allow(null)
      .messages({
        'string.base': 'mimeType matn bo‘lishi kerak',
      }),
    thumbnailPath: Joi.string().allow(null)
      .messages({
        'string.base': 'thumbnailPath matn bo‘lishi kerak',
      }),
    width: Joi.number().integer().min(0).allow(null)
      .messages({
        'number.base': 'width raqam bo‘lishi kerak',
        'number.integer': 'width butun son bo‘lishi kerak',
        'number.min': 'width 0 dan kichik bo‘lmasligi kerak',
      }),
    height: Joi.number().integer().min(0).allow(null)
      .messages({
        'number.base': 'height raqam bo‘lishi kerak',
        'number.integer': 'height butun son bo‘lishi kerak',
        'number.min': 'height 0 dan kichik bo‘lmasligi kerak',
      }),
    duration: Joi.number().integer().min(0).allow(null)
      .messages({
        'number.base': 'duration raqam bo‘lishi kerak',
        'number.integer': 'duration butun son bo‘lishi kerak',
        'number.min': 'duration 0 dan kichik bo‘lmasligi kerak',
      }),
  });

  return schema.validate(data, { abortEarly: false });
};

module.exports = { mediaFileValidation };