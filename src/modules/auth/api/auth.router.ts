import { Router } from "express";
import {authController} from "../application/auth.composition";

export const authRouter = Router();

authRouter.post('/login', authController.login);