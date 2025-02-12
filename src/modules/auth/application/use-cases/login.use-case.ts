import bcrypt from 'bcrypt';
import {UsersQueryRepository} from "../../../users/domain/infrastructures/repositories/users-query.repository";
import {LoginDTO} from "../interfaces/auth.interface";
import {Result} from "../../../../shared/infrastructures/result";

export class LoginUseCase {
    constructor(private usersQueryRepository: UsersQueryRepository) {}

    async execute(dto: LoginDTO): Promise<Result<void>> {
        const { loginOrEmail, password } = dto;

        if (!loginOrEmail || !password) {
            return Result.fail('All fields are required');
        }

        const user = await this.usersQueryRepository.findByFilter({
            $or: [
                { login: loginOrEmail },
                { email: loginOrEmail }
            ]
        });

        if (!user) {
            return Result.fail('Invalid credentials');
        }

        const isPasswordValid = await bcrypt.compare(password, user.passwordHash);

        if (!isPasswordValid) {
            return Result.fail('Invalid credentials');
        }

        return Result.ok();
    }
}