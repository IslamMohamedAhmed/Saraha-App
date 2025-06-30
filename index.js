import express, { json } from 'express';
import cors from 'cors';
import { connectDb } from './Database/dbConnection.js';
import userRouter from './src/modules/user/user.routes.js';
import messageRouter from './src/modules/message/message.routes.js';
const app = express()
const port = 3000
app.use(json());
app.use(cors());
app.use(userRouter);
app.use(messageRouter);
await connectDb();
app.listen(port, () => console.log(`Example app listening on port ${port}!`))
