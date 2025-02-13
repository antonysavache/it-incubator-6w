import { Router } from "express";
import {authMiddleware} from "../../../shared/infrastructures/middlewares/auth.middleware";
import {usersController} from "../../../configs/compositions/users-composition";

export const usersRouter = Router();

usersRouter.get('/',
    authMiddleware,
    usersController.getUsers
);

usersRouter.post('/',
    authMiddleware,
    usersController.createUser
);