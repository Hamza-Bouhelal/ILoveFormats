import Joi from "joi";

export const apiKeySchema = Joi.object({
  expiresAt: Joi.date().required(),
  name: Joi.string().max(50).required(),
});
