import { ValidationResult } from "../models/validation-result.model";
import { ErrorMessage } from "../models/common.model";
import { Result } from "../infrastructures/result";

export class CommentContent {
    private constructor(private readonly value: string) {}

    static validate(content: string): ValidationResult {
        const errors: ErrorMessage[] = [];

        if (!content?.trim()) {
            errors.push({
                message: 'Content is required',
                field: 'content'
            });
        } else {
            if (content.length < 20 || content.length > 300) {
                errors.push({
                    message: 'Content should be between 20 and 300 characters',
                    field: 'content'
                });
            }
        }

        return {
            isValid: errors.length === 0,
            errors
        };
    }

    static create(content: string): Result<CommentContent> {
        const validation = this.validate(content);
        if (!validation.isValid) {
            return Result.fail({ errorsMessages: validation.errors });
        }
        return Result.ok(new CommentContent(content.trim()));
    }

    getValue(): string {
        return this.value;
    }
}