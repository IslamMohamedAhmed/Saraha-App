import express from 'express';
import { addMessage, getAllMessages } from './message.controller.js';
import { validateToken } from '../../middlewares/validateToken.js';

const messageRouter = express.Router();


messageRouter.route('/messages').post(addMessage).get(validateToken, getAllMessages);


export default messageRouter;