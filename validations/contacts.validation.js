const Joi = require('joi');

const contactValidation = (data) => {
  const schema = Joi.object({
    // user_id: Joi.number()
    //   .integer()
    //   .positive()
    //   .required()
    //   .messages({
    //     'number.base': 'User ID raqam bo‘lishi kerak',
    //     'number.integer': 'User ID butun son bo‘lishi kerak',
    //     'number.positive': 'User ID musbat bo‘lishi kerak',
    //     'any.required': 'User ID majburiy',
    //   }),
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
    // added_on: Joi.date()
    //   .default(() => new Date(), 'Hozirgi vaqt')
    //   .messages({
    //     'date.base': 'Added on sana bo‘lishi kerak',
    //   }),
  });

  return schema.validate(data, { abortEarly: false });
};

module.exports = { contactValidation };