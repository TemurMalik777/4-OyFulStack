const Joi = require('joi');

const chatValidation = (data) => {
  const schema = Joi.object({
    title: Joi.string()
      .max(255)
      .required()
      .messages({
        'string.base': 'Title matn bo‘lishi kerak',
        'string.max': 'Title 255 belgidan uzun bo‘lmasligi kerak',
        'any.required': 'Title majburiy',
      }),
    description: Joi.string()
      .max(1000)
      .allow(null, '')
      .messages({
        'string.base': 'Description matn bo‘lishi kerak',
        'string.max': 'Description 1000 belgidan uzun bo‘lmasligi kerak',
      }),
    photo: Joi.string()
      .max(255)
      .allow(null, '')
      .messages({
        'string.base': 'Photo matn bo‘lishi kerak',
        'string.max': 'Photo 255 belgidan uzun bo‘lmasligi kerak',
      }),
    type: Joi.string()
      .max(50)
      .required()
      .messages({
        'string.base': 'Type matn bo‘lishi kerak',
        'string.max': 'Type 50 belgidan uzun bo‘lmasligi kerak',
        'any.required': 'Type majburiy',
      }),
    members_count: Joi.number()
      .integer()
      .min(0)
      .default(0)
      .messages({
        'number.base': 'Members count raqam bo‘lishi kerak',
        'number.integer': 'Members count butun son bo‘lishi kerak',
        'number.min': 'Members count 0 dan kichik bo‘lmasligi kerak',
      }),
    // created_at: Joi.date()
    //   .default(() => new Date(), 'Hozirgi vaqt')
    //   .messages({
    //     'date.base': 'Created at sana bo‘lishi kerak',
    //   }),
    // invite_link: Joi.string()
    //   .max(255)
    //   .allow(null, '')
    //   .messages({
    //     'string.base': 'Invite link matn bo‘lishi kerak',
    //     'string.max': 'Invite link 255 belgidan uzun bo‘lmasligi kerak',
    //   }),
  });

  return schema.validate(data, { abortEarly: false });
};

module.exports = { chatValidation };