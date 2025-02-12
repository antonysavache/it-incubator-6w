import {UsersQueryRepository} from "../../users/domain/infrastructures/repositories/users-query.repository";
import {LoginUseCase} from "./use-cases/login.use-case";
import {AuthController} from "../api/auth.controller";

export const usersQueryRepository = new UsersQueryRepository();

// Use Cases
export const loginUseCase = new LoginUseCase(
    usersQueryRepository
);

// Controller
export const authController = new AuthController(
    loginUseCase
);