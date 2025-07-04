import { appError } from "../utils/appError.js";


export const validateInputs = (schema) => {
    return (req, res, next) => {
        let { error } = schema.validate({ ...req.params, ...req.body, ...req.query }, { abortEarly: false });
        if (error) {
            let errMessages = [];
            error.details.forEach(val => {
                errMessages.push(val.message);
            });
            next(new appError(errMessages, 401));
        }
        else {
            next();
        }
    };
};


