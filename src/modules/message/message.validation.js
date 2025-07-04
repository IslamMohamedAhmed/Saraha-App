import joi from 'joi';


const validateAddMessage = joi.object({
    messageText: joi.string().min(2).max(300).required(),
    id: joi.string().hex().length(24)
});





export {
    validateAddMessage
}