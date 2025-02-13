import { LoginUseCase } from "../../modules/auth/application/use-cases/login.use-case";
import { AuthController } from "../../modules/auth/api/auth.controller";
import {UsersQueryRepository} from "../../modules/users/domain/infrastructures/repositories/users-query.repository";

export const usersQueryRepository = new UsersQueryRepository();

export const loginUseCase = new LoginUseCase(
    usersQueryRepository
);

export const authController = new AuthController(
    loginUseCase
);