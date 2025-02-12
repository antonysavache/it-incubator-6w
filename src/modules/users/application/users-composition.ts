import {UsersQueryRepository} from "../domain/infrastructures/repositories/users-query.repository";
import {UsersCommandRepository} from "../domain/infrastructures/repositories/users-command.repository";
import {UserSpecification} from "../domain/specifications/user.specification";
import {CreateUserUseCase} from "./use-cases/create-user.use-case";
import {GetUsersUseCase} from "./use-cases/get-users.use-case";
import {UsersController} from "../api/users.controller";

export const usersQueryRepository = new UsersQueryRepository();
export const usersCommandRepository = new UsersCommandRepository();

export const userSpecification = new UserSpecification();

export const createUserUseCase = new CreateUserUseCase(
    usersQueryRepository,
    usersCommandRepository,
    userSpecification
);

export const getUsersUseCase = new GetUsersUseCase(
    usersQueryRepository
);

export const usersController = new UsersController(
    createUserUseCase,
    getUsersUseCase
);