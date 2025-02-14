import {ObjectId} from "mongodb";
import {Login} from "../../../shared/value-objects/login.value-object";
import {Email} from "../../../shared/value-objects/email.value-object";
import {Password} from "../../../shared/value-objects/password.value-object";
import {UserCreateDTO, UserDatabaseModel, UserViewModel} from "./interfaces/user.interface";
import {UserSpecification} from "./specifications/user.specification";
import {UsersQueryRepository} from "./infrastructures/repositories/users-query.repository";
import {Result} from "../../../shared/infrastructures/result";
import {SETTINGS} from "../../../configs/settings";

export class UserEntity {
    private constructor(
        private readonly id: ObjectId,
        private readonly login: Login,
        private readonly email: Email,
        private readonly password: Password,
        private readonly createdAt: string
    ) {}

    static async create(
        userData: UserCreateDTO,
        specification: UserSpecification,
        userQueryRepository: UsersQueryRepository
    ): Promise<Result<UserEntity>> {
        const loginResult = Login.create(userData.login);
        if (loginResult.isFailure()) {
            return Result.fail(loginResult.getError());
        }

        const emailResult = Email.create(userData.email);
        if (emailResult.isFailure()) {
            return Result.fail(emailResult.getError());
        }

        const passwordResult = Password.create(userData.password);
        if (passwordResult.isFailure()) {
            return Result.fail(passwordResult.getError());
        }

        const isLoginUnique = await userQueryRepository.findByFilter({
            login: loginResult.getValue().getValue()
        });
        const isEmailUnique = await userQueryRepository.findByFilter({
            email: emailResult.getValue().getValue()
        });

        if (isLoginUnique) {
            return Result.fail({
                errorsMessages: [{ message: 'Login already exists', field: 'login' }]
            });
        }

        if (isEmailUnique) {
            return Result.fail({
                errorsMessages: [{ message: 'Email already exists', field: 'email' }]
            });
        }

        const hashedPassword = await passwordResult.getValue().hash(SETTINGS.SALT_ROUNDS);

        return Result.ok(new UserEntity(
            new ObjectId(),
            loginResult.getValue(),
            emailResult.getValue(),
            Password.createHashed(hashedPassword),
            new Date().toISOString()
        ));
    }

    toDatabaseModel(): UserDatabaseModel {
        return {
            _id: this.id,
            login: this.login.getValue(),
            email: this.email.getValue(),
            passwordHash: this.password.getHashedValue(),
            createdAt: this.createdAt
        };
    }

    toViewModel(): UserViewModel {
        return {
            id: this.id.toString(),
            login: this.login.getValue(),
            email: this.email.getValue(),
            createdAt: this.createdAt
        };
    }

    async validatePassword(password: string): Promise<boolean> {
        return this.password.compareWith(password);
    }
}