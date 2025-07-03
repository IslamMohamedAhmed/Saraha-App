import jwt from 'jsonwebtoken';
import { appError } from '../utils/appError.js';


export const validateToken = async (req, res, next) => {
    let token = req.header('token');
    jwt.verify(token, process.env.JWT_KEY_SIGNIN, (err, decoded) => {
        if (err) return next(new appError(err, 401));

        req.userId = decoded.userId;

    });
    next();
}



