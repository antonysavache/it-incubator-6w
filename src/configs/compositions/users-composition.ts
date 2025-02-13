import { UserSpecification } from "../../modules/users/domain/specifications/user.specification";
import { CreateUserUseCase } from "../../modules/users/application/use-cases/create-user.use-case";
import { GetUsersUseCase } from "../../modules/users/application/use-cases/get-users.use-case";
import { UsersController } from "../../modules/users/api/users.controller";
import {UsersQueryRepository} from "../../modules/users/domain/infrastructures/repositories/users-query.repository";
import {UsersCommandRepository} from "../../modules/users/domain/infrastructures/repositories/users-command.repository";

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