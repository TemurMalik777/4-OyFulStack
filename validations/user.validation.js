const Joi = require("joi");

exports.userValidation = (body) => {
  const schemaUser = Joi.object({
    username: Joi.string()
      .pattern(/^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]+$/)
      .message("Username must contain both letters and numbers")
      .allow("", null), // to'ldirilmasa ham bo'ladi
    password: Joi.string().min(6).max(30).required(),
    phone_number: Joi.string()
      .pattern(/^\d{2}-\d{3}-\d{2}-\d{2}$/)
      .required()
      .messages({
        "string.pattern.base": `"phone" formati noto'g'ri. Masalan: 90-123-45-67`,
        "any.required": `"phone" maydoni majburiy`,
      }),
    first_name: Joi.string().max(30).required().messages({
      "string.base": `"first_name" matn bo'lishi kerak`,
      "string.empty": `"first_name" bo'sh bo'lmasligi kerak`,
    }),
    last_name: Joi.string().max(30).messages({
      "string.base": `"last_name" matn bo'lishi kerak`,
      "string.empty": `"last_name" bo'sh bo'lmasligi kerak`,
    }),
    profil_photo: Joi.string().allow("", null),
    last_seem: Joi.date().iso().messages({
      "date.base": `"last_seem" must be a valid date`,
      "date.format": `"last_seem" must be in ISO format (YYYY-MM-DD or YYYY-MM-DDTHH:mm:ss.sssZ)`,
      "date.isoDate": `"last_seem" must be in ISO format`,
    }),
    bio: Joi.string()
      .max(255)
      .message("bio must be at most 255 characters")
      .allow("", null), // optional
    refresh_token: Joi.string().optional(),
  });
  return schemaUser.validate(body, {
    abortEarly: false,
  });
};
