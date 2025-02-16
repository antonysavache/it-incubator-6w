import { CommentsQueryRepository } from "../../infrastructure/repositories/comments-query.repository";
import { PostsQueryRepository } from "../../../posts/infrastructure/repositories/posts-query.repository";
import { CommentViewModel } from "../../domain/interfaces/comment.interface";
import { Result } from "../../../../shared/infrastructures/result";

export class GetCommentUseCase {
    constructor(
        private commentsQueryRepository: CommentsQueryRepository,
        private postsQueryRepository: PostsQueryRepository
    ) {}

    async execute(id: string): Promise<Result<CommentViewModel>> {
        const comment = await this.commentsQueryRepository.findById(id);
        if (!comment) {
            return Result.fail('Comment not found');
        }

        const post = await this.postsQueryRepository.findById(comment.postId);
        if (!post) {
            return Result.fail('Post not found');
        }

        return Result.ok(comment);
    }
}