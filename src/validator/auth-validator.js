const { defaults } = require('joi');
const Joi = require('joi')
 
const registerSchema = Joi.object({
    userName: Joi.string().trim().required(),
    password: Joi.string()
        .pattern(/^[a-zA-Z0-9]{6,30}$/)
        .trim()
        .required(), 
    firstName: Joi.string().trim().required(),
    lastName: Joi.string().trim().required(),
    mobile: Joi.string().trim().required(),
    email: Joi.string().email().required(),
});

exports.registerSchema = registerSchema;

const loginSchema = Joi.object({
    userName: Joi.string().trim().required(),
    password: Joi.string()
    .pattern(/^[a-zA-Z0-9]{6,30}$/)
    .trim()
    .required()
});

exports.loginSchema = loginSchema; 