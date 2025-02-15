import {CommentsCommandRepository} from "../../infrastructure/repositories/comments-command.repository";
import {PostsQueryRepository} from "../../../posts/infrastructure/repositories/posts-query.repository";
import {Result} from "../../../../shared/infrastructures/result";
import {CommentViewModel} from "../../domain/interfaces/comment.interface";
import {CommentsQueryRepository} from "../../infrastructure/repositories/comments-query.repository";

export class CreateCommentUseCase {
    constructor(
        private commentsCommandRepository: CommentsCommandRepository,
        private commentsQueryRepository: CommentsQueryRepository,
        private postsQueryRepository: PostsQueryRepository
    ) {}

    async execute(
        postId: string,
        content: string,
        userId: string,
        userLogin: string
    ): Promise<Result<{ id: string } & {
        postId: string;
        content: string;
        userId: string;
        userLogin: string;
        createdAt: string
    }>> {
        const post = await this.postsQueryRepository.findById(postId);
        if (!post) {
            return Result.fail('Post not found');
        }
        const commentData = {
            postId,
            content,
            userId,
            userLogin,
            createdAt: new Date().toISOString()
        };

        const id = await this.commentsCommandRepository.create(commentData);
        const createdComment = await this.commentsQueryRepository.findById(id);

        return Result.ok(createdComment);
    }
}