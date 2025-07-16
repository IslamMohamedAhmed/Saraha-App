import joi from 'joi';


const validateSignup = joi.object({
    name: joi.string().min(2).max(20).required(),
    email: joi.string().email().required(),
    password: joi.string().pattern(/^[A-Z][a-z0-9]{8,40}$/).required(),
    age: joi.number().integer().min(10).max(80).required()
});

const validateSignin = joi.object({
    email: joi.string().email().required(),
    password: joi.string().pattern(/^[A-Z][a-z0-9]{8,40}$/).required(),
});

const validateRequestResetPassword = joi.object({
    id: joi.string().hex().length(24)
});

const validateResetPassword = joi.object({
    token: joi.string(),
    password: joi.string().pattern(/^[A-Z][a-z0-9]{8,40}$/).required(),
});



export {
    validateSignup,
    validateSignin,
    validateRequestResetPassword,
    validateResetPassword
}
