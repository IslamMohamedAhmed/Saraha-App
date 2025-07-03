process.on('uncaughtException', (err) => {
  console.log(err);
});

import express, { json } from 'express';
import cors from 'cors';
import { connectDb } from './Database/dbConnection.js';
import userRouter from './src/modules/user/user.routes.js';
import messageRouter from './src/modules/message/message.routes.js';
import { appError } from './src/utils/appError.js';
import { invalidPathHandler } from './src/middlewares/invalidPathHandler.js';
import { globalErrorHandler } from './src/middlewares/globalErrorHandler.js';
import dotenv from "dotenv";
const app = express();
dotenv.config();
const port = 3000;
app.use(json());
app.use(cors());
app.use(userRouter);
app.use(messageRouter);
await connectDb();
app.use(invalidPathHandler);
app.use(globalErrorHandler);
process.on('unhandledRejection', (err) => {
  console.log(err);
});
app.listen(port, () => console.log(`Example app listening on port ${port}!`))
