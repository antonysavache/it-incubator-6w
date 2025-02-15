import {CommentsCommandRepository} from "../../infrastructure/repositories/comments-command.repository";
import {CommentsQueryRepository} from "../../infrastructure/repositories/comments-query.repository";
import {Result} from "../../../../shared/infrastructures/result";

export class UpdateCommentUseCase {
    constructor(
        private commentsCommandRepository: CommentsCommandRepository,
        private commentsQueryRepository: CommentsQueryRepository
    ) {}

    async execute(
        id: string,
        userId: string,
        content: string
    ): Promise<Result<void>> {
        const comment = await this.commentsQueryRepository.findById(id);

        if (!comment) {
            return Result.fail('Comment not found');
        }

        if (comment.userId !== userId) {
            return Result.fail('Forbidden');
        }

        const isUpdated = await this.commentsCommandRepository.update(id, { content });
        if (!isUpdated) {
            return Result.fail('Failed to update comment');
        }

        return Result.ok();
    }
}