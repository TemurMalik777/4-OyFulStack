const Joi = require("joi");

const userChatValidation = (data) => {
  const schema = Joi.object({
    // userId: Joi.number().integer().positive().required()
    //   .messages({
    //     'number.base': 'userId raqam bo‘lishi kerak',
    //     'number.integer': 'userId butun son bo‘lishi kerak',
    //     'number.positive': 'userId musbat bo‘lishi kerak',
    //     'any.required': 'userId majburiy maydon',
    //   }),
    chatId: Joi.number().integer().positive().required().messages({
      "number.base": "chatId raqam bo‘lishi kerak",
      "number.integer": "chatId butun son bo‘lishi kerak",
      "number.positive": "chatId musbat bo‘lishi kerak",
      "any.required": "chatId majburiy maydon",
    }),
    joined_at: Joi.date().required().messages({
      "date.base": "joined_at sana bo‘lishi kerak",
      "any.required": "joined_at majburiy maydon",
    }),
  });

  return schema.validate(data, { abortEarly: false });
};

module.exports = { userChatValidation };
