import { Router } from 'express';
import * as userController from '../controller/user.contoller';

export const userRouter = Router();

userRouter.post('/users', userController.createUser);

userRouter.put('/users/:id', userController.updateUser);

userRouter.delete('/users/:id', userController.deleteUser);

userRouter.get('/users/usernames', userController.getAllUsernames);

userRouter.get('/users', userController.getAllUsers);

userRouter.get('/users/:id', userController.getUserById);

userRouter.get('/users/username/:username', userController.getUserByUsername);

userRouter.get('/users/email/:email', userController.getUserByEmail);