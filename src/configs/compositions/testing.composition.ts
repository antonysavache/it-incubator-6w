import {
    DeleteAllDataUseCase,
    TestingController
} from "../../modules/testing/application/use-cases/delete-all-data.use-case";
import { blogsCommandRepository } from "./blogs.composition";
import { postsCommandRepository } from "./posts.composition";
import {usersCommandRepository} from "../../modules/users/application/users-composition";

export const deleteAllDataUseCase = new DeleteAllDataUseCase(
    blogsCommandRepository,
    postsCommandRepository,
    usersCommandRepository
);

export const testingController = new TestingController(
    deleteAllDataUseCase
);