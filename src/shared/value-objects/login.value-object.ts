import {Result} from "../infrastructures/result";

export class Login {
    private constructor(private readonly value: string) {}

    static create(login: string): Result<Login> {
        if (!login?.trim()) {
            return Result.fail({
                errorsMessages: [{
                    message: 'Login is required',
                    field: 'login'
                }]
            });
        }

        const loginRegex = /^[a-zA-Z0-9_-]{3,10}$/;
        if (!loginRegex.test(login)) {
            return Result.fail({
                errorsMessages: [{
                    message: 'Login should be 3-10 characters and contain only latin letters, numbers, dash and underscore',
                    field: 'login'
                }]
            });
        }

        return Result.ok(new Login(login));
    }

    getValue(): string {
        return this.value;
    }
}