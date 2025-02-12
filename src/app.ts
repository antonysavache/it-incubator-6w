import express from "express";
import {SETTINGS} from "./configs/settings";
import {usersRouter} from "./modules/users/api/users.router";
import {authRouter} from "./modules/auth/api/auth.router";

export const app = express();
app.use(express.json());

app.use(SETTINGS.PATH.USERS, usersRouter);
app.use(SETTINGS.PATH.AUTH, authRouter);
