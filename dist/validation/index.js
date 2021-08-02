"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginValidation = exports.registerValidation = void 0;
const Joi = require("joi");
const registerValidation = (data) => {
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
exports.registerValidation = registerValidation;
const loginValidation = (data) => {
    const schema = Joi.object({
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required(),
    });
    return schema.validate(data);
};
exports.loginValidation = loginValidation;
//# sourceMappingURL=index.js.map