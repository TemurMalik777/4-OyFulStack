const Joi = require("joi");

const chatAdminsValidation = (data) => {
  const schema = Joi.object({
    chatId: Joi.number().integer().required(),
    userId: Joi.number().integer().required(),
    can_edit_messages: Joi.boolean().default(false).messages({
      "boolean.base": "can_edit_messages true yoki false bo‘lishi kerak",
    }),
    can_delete_message: Joi.boolean().default(false).messages({
      "boolean.base": "can_delete_message true yoki false bo‘lishi kerak",
    }),
    can_add_members: Joi.boolean().default(false).messages({
      "boolean.base": "can_add_members true yoki false bo‘lishi kerak",
    }),
    can_invite: Joi.boolean().default(false).messages({
      "boolean.base": "can_invite true yoki false bo‘lishi kerak",
    }),
    can_pin_messages: Joi.boolean().default(false).messages({
      "boolean.base": "can_pin_messages true yoki false bo‘lishi kerak",
    }),
    // promoted_at: Joi.date()
    //   .default(() => new Date(), 'Hozirgi vaqt')
    //   .messages({
    //     'date.base': 'Promoted at sana bo‘lishi kerak',
    //   }),
  });

  return schema.validate(data, { abortEarly: false });
};

module.exports = { chatAdminsValidation };
