import { LoginUseCase } from "../../modules/auth/application/use-cases/login.use-case";
import { AuthController } from "../../modules/auth/api/auth.controller";
import {usersQueryRepository} from "./repositories";


export const loginUseCase = new LoginUseCase(
    usersQueryRepository
);

export const authController = new AuthController(
    loginUseCase
);