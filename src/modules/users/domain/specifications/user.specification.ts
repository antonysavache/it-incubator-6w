import {Result} from "../../../../shared/infrastructures/result";

export class UserSpecification {
    validateCreateUser(login: string, email: string, password: string): Result<void> {
        if (!login?.trim() || !email?.trim() || !password?.trim()) {
            return Result.fail('All fields are required');
        }

        const loginRegex = /^[a-zA-Z0-9_-]{3,10}$/;
        if (!loginRegex.test(login)) {
            return Result.fail('Login should be 3-10 characters and contain only latin letters, numbers, dash and underscore');
        }

        const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
        if (!emailRegex.test(email)) {
            return Result.fail('Invalid email format');
        }

        if (password.length < 6 || password.length > 20) {
            return Result.fail('Password should be 6-20 characters');
        }

        return Result.ok();
    }
}