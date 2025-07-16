import express from 'express';
import { checkEmail } from '../../middlewares/checkEmail.js';
import { hashPassword } from '../../middlewares/hashPassword.js';
import { requestResetPassword, resetPassword, signin, signup, verify } from './user.controller.js';
import { validateInputs } from '../../middlewares/validateInputs.js';
import { validateRequestResetPassword, validateResetPassword, validateSignin, validateSignup } from './user.validation.js';


const userRouter = express.Router();


userRouter.route('/signup').post(validateInputs(validateSignup), checkEmail, hashPassword, signup);
userRouter.route('/verify/:token').get(verify);
userRouter.route('/signin').post(validateInputs(validateSignin), signin);
userRouter.route('/reset-password/:id').get(validateInputs(validateRequestResetPassword), requestResetPassword)
userRouter.route('/reset-password/:token').post(validateInputs(validateResetPassword), hashPassword, resetPassword);

export default userRouter;
