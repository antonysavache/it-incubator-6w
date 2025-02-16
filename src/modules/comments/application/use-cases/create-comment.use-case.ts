import { CommentsCommandRepository } from "../../infrastructure/repositories/comments-command.repository";
import { PostsQueryRepository } from "../../../posts/infrastructure/repositories/posts-query.repository";
import { Result } from "../../../../shared/infrastructures/result";
import { CommentViewModel } from "../../domain/interfaces/comment.interface";
import { CommentsQueryRepository } from "../../infrastructure/repositories/comments-query.repository";
import {ObjectId} from "mongodb";

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
    ): Promise<Result<CommentViewModel>> {
        const post = await this.postsQueryRepository.findById(postId);
        if (!post) {
            return Result.fail('Post not found');
        }

        const commentData = {
            _id: new ObjectId(),
            postId,
            content,
            userId,
            userLogin,
            createdAt: new Date().toISOString()
        };

        const id = await this.commentsCommandRepository.create(commentData);
        const comment = await this.commentsQueryRepository.findPublicById(id);

        if (!comment) {
            return Result.fail('Failed to create comment');
        }

        return Result.ok(comment);
    }
}