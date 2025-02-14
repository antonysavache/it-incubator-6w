import {Result} from "../infrastructures/result";

export class Email {
    private constructor(private readonly value: string) {}

    static create(email: string): Result<Email> {
        if (!email?.trim()) {
            return Result.fail({
                errorsMessages: [{
                    message: 'Email is required',
                    field: 'email'
                }]
            });
        }

        const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
        if (!emailRegex.test(email)) {
            return Result.fail({
                errorsMessages: [{
                    message: 'Invalid email format',
                    field: 'email'
                }]
            });
        }

        return Result.ok(new Email(email.toLowerCase()));
    }

    getValue(): string {
        return this.value;
    }

    equals(other: Email): boolean {
        return this.value === other.value;
    }
}