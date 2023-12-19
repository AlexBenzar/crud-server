import { Router } from 'express';
import UserController from '../controllers/User.controller.js';
import signUpValidator from '../middleware/signUpValidation.middleware.js';

const userRouter = new Router();

userRouter.get('/users', UserController.getAll);
userRouter.post('/signup', signUpValidator, UserController.signUp);
userRouter.post('/signin', UserController.signIn);

export default userRouter;
