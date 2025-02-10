export class Result<T> {
    private constructor(
        private readonly isSuccess: boolean,
        private readonly error?: string,
        private readonly value?: T
    ) {}

    public getValue(): T {
        if (!this.isSuccess) {
            throw new Error('Can\'t get value from error result');
        }
        return this.value;
    }

    public getError(): string {
        if (this.isSuccess) {
            throw new Error('Can\'t get error from success result');
        }
        return this.error;
    }

    public isFailure(): boolean {
        return !this.isSuccess;
    }

    public static ok<U>(value?: U): Result<U> {
        return new Result<U>(true, undefined, value);
    }

    public static fail<U>(error: string): Result<U> {
        return new Result<U>(false, error);
    }
}