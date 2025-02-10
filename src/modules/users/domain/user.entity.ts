import { ObjectId } from 'mongodb';
import {UserCreateDTO, UserDatabaseModel, UserViewModel} from "./interfaces/user.interface";
import {UserSpecification} from "./specifications/user.specification";
import {UsersQueryRepository} from "./infrastructures/repositories/users-query.repository";
import {SETTINGS} from "../../../configs/settings";
import bcrypt from 'bcrypt';

export class UserEntity {
    constructor(
        private readonly id: ObjectId,
        private readonly login: string,
        private readonly email: string,
        private readonly passwordHash: string,
        private readonly createdAt: string
    ) {}

    static async create(
        userData: UserCreateDTO,
        specification: UserSpecification,
        userQueryRepository: UsersQueryRepository
    ): Promise<UserEntity> {
        const validationResult = specification.validateCreateUser(
            userData.login,
            userData.email,
            userData.password
        );

        if (validationResult.isFailure()) {
            throw new Error(validationResult.getError());
        }

        const isLoginUnique = await userQueryRepository.findByFilter({ login: userData.login });
        const isEmailUnique = await userQueryRepository.findByFilter({ email: userData.email });

        if (isLoginUnique) {
            throw new Error('Login already exists');
        }

        if (isEmailUnique) {
            throw new Error('Email already exists');
        }

        const passwordHash = this.hashPassword(userData.password);

        return new UserEntity(
            new ObjectId(),
            userData.login,
            userData.email,
            passwordHash,
            new Date().toISOString()
        );
    }

    toDatabaseModel(): UserDatabaseModel {
        return {
            _id: this.id,
            login: this.login,
            email: this.email,
            passwordHash: this.passwordHash,
            createdAt: this.createdAt
        };
    }

    toViewModel(): UserViewModel {
        return {
            id: this.id.toString(),
            login: this.login,
            email: this.email,
            createdAt: this.createdAt
        };
    }

    private static hashPassword(password: string): string {
        return bcrypt.hashSync(password, SETTINGS.SALT_ROUNDS);
    }
}