import * as Joi from "joi";

export const authSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required().min(6).max(30),
});

export const refreshTokenSchema = Joi.object({
  refreshToken: Joi.string().required(),
});
