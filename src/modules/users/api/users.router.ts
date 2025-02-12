import { Router } from "express";
import {usersController} from "../application/users-composition";
import {authMiddleware} from "../../../shared/infrastructures/middlewares/auth.middleware";

export const usersRouter = Router();

usersRouter.get('/',
    authMiddleware,
    usersController.getUsers
);

usersRouter.post('/',
    authMiddleware,
    usersController.createUser
);