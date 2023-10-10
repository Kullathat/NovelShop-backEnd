const Joi = require('joi')

const registerSchema = Joi.object({
    firstName: Joi.string().trim(),
    lastName: Joi.string().trim(),
    emailOrMobile: Joi.alternatives([
        Joi.string().email(),
        Joi.string().pattern(/^[0-9]{10}$/)
    ]).required().strip(),
    password: Joi.string()
        .pattern(/^[a-zA-Z0-9]{6,30}$/)
        .trim()
        .required(),
    mobile: Joi.forbidden().when('emailOrmobile',{
        is: Joi.string().pattern(/^[0-9]{10}$/),
        then: Joi.string().default(Joi.ref('emailOrMobile'))
     }),
     email: Joi.forbidden().when('emailOrMobile',{
        is: Joi.string().email(),
        then: Joi.string().default(Joi.ref('emailOrMobile'))
     })
});

exports.registerSchema = registerSchema;