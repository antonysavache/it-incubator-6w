import {Result} from "../infrastructures/result";
import bcrypt from "bcrypt";

export class Password {
    private constructor(
        private readonly value: string,
        private readonly hashedValue?: string
    ) {}

    static create(password: string): Result<Password> {
        if (!password?.trim()) {
            return Result.fail({
                errorsMessages: [{
                    message: 'Password is required',
                    field: 'password'
                }]
            });
        }

        if (password.length < 6 || password.length > 20) {
            return Result.fail({
                errorsMessages: [{
                    message: 'Password should be 6-20 characters',
                    field: 'password'
                }]
            });
        }

        return Result.ok(new Password(password));
    }

    static createHashed(hashedPassword: string): Password {
        return new Password('', hashedPassword);
    }

    async hash(saltRounds: number): Promise<string> {
        if (this.hashedValue) {
            throw new Error('Password is already hashed');
        }
        return bcrypt.hash(this.value, saltRounds);
    }

    async compareWith(plainPassword: string): Promise<boolean> {
        if (!this.hashedValue) {
            throw new Error('Cannot compare unhashed password');
        }
        return bcrypt.compare(plainPassword, this.hashedValue);
    }

    getHashedValue(): string {
        if (!this.hashedValue) {
            throw new Error('Password is not hashed');
        }
        return this.hashedValue;
    }
}