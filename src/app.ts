import express from "express";
import {SETTINGS} from "./configs/settings";
import {usersRouter} from "./modules/users/users.router";

export const app = express();
app.use(express.json());

app.use(SETTINGS.PATH.USERS, usersRouter);