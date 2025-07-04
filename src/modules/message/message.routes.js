import express from 'express';
import { addMessage, getAllMessages, shareProfile } from './message.controller.js';
import { validateToken } from '../../middlewares/validateToken.js';
import { validateInputs } from '../../middlewares/validateInputs.js';
import { validateAddMessage } from './message.validation.js';

const messageRouter = express.Router();


messageRouter.route('/messages/:id').post(validateInputs(validateAddMessage), addMessage)
messageRouter.route('/messages').get(validateToken, getAllMessages);
messageRouter.route('/shareProfile').get(shareProfile);

export default messageRouter;