import express from 'express';
import { checkEmail } from '../../middlewares/checkEmail.js';
import { hashPassword } from '../../middlewares/hashPassword.js';
import { signin, signup, verify } from './user.controller.js';


const userRouter = express.Router();


userRouter.route('/signup').post(checkEmail, hashPassword, signup);
userRouter.route('/verify/:token').get(verify);
userRouter.route('/signin').post(signin);


export default userRouter;
