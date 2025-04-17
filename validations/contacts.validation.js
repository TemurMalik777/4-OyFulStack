const Joi = require('joi');

const contactValidation = (data) => {
  const schema = Joi.object({
    userId: Joi.number().integer().required(),
    display_name: Joi.string()
      .max(255)
      .allow(null, '')
      .messages({
        'string.base': 'Display name matn bo‘lishi kerak',
        'string.max': 'Display name 255 belgidan uzun bo‘lmasligi kerak',
      }),
    is_blocked: Joi.boolean()
      .default(false)
      .messages({
        'boolean.base': 'is_blocked true yoki false bo‘lishi kerak',
      }),
  });

  return schema.validate(data, { abortEarly: false });
};

module.exports = { contactValidation };