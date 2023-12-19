import express from 'express';
import mongoose from 'mongoose';
import userRouter from './app/routes/User.routes.js';

const PORT = 5000;
const DB__URL = `mongodb+srv://olexandrbenzarsifex:12345@crud-database.xlbnxut.mongodb.net/`;

const app = express();

app.use(express.json());
app.use('/api', userRouter);

async function startApp() {
  try {
    await mongoose.connect(DB__URL);
    app.listen(PORT, () => console.log('Server is working...'));
  } catch (error) {
    console.log(error);
  }
}

startApp();
