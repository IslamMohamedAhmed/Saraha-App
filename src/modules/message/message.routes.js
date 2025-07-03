import express from 'express';
import { addMessage, getAllMessages, shareProfile } from './message.controller.js';
import { validateToken } from '../../middlewares/validateToken.js';

const messageRouter = express.Router();


messageRouter.route('/messages').post(addMessage).get(validateToken, getAllMessages);
messageRouter.route('/shareProfile').get(shareProfile);

export default messageRouter;