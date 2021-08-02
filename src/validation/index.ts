import * as Joi from "joi";

interface RegisterValidationData {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  username: string;
  email: string;
  password: string;
  date: Date;
}
interface LoginValidationData {
  email: string;
  password: string;
}
export const registerValidation = (data: RegisterValidationData) => {
  const schema = Joi.object({
    username: Joi.string().min(6).required(),
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required(),
    firstName: Joi.string().min(6),
    lastName: Joi.string().min(6),
    phoneNumber: Joi.string().min(11),
    date: Joi.string(),
    address: Joi.string().min(3),
  });
  return schema.validate(data);
};

export const loginValidation = (data: LoginValidationData) => {
  const schema = Joi.object({
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required(),
  });
  return schema.validate(data);
};
