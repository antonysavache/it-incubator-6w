import {CommentsQueryRepository} from "../../modules/comments/infrastructure/repositories/comments-query.repository";
import {
    CommentsCommandRepository
} from "../../modules/comments/infrastructure/repositories/comments-command.repository";
import {CreateCommentUseCase} from "../../modules/comments/application/use-cases/create-comment.use-case";
import {postsQueryRepository} from "./repositories";
import {UpdateCommentUseCase} from "../../modules/comments/application/use-cases/update-comment.use-case";
import {DeleteCommentUseCase} from "../../modules/comments/application/use-cases/delete-comment.use-case";
import {GetCommentUseCase} from "../../modules/comments/application/use-cases/get-comment.use-case";
import {CommentsController} from "../../modules/comments/api/comments.controller";

export const commentsQueryRepository = new CommentsQueryRepository();
export const commentsCommandRepository = new CommentsCommandRepository();

export const createCommentUseCase = new CreateCommentUseCase(
    commentsCommandRepository,
    commentsQueryRepository,
    postsQueryRepository
);

export const updateCommentUseCase = new UpdateCommentUseCase(
    commentsCommandRepository,
    commentsQueryRepository
);

export const deleteCommentUseCase = new DeleteCommentUseCase(
    commentsCommandRepository,
    commentsQueryRepository
);

export const getCommentUseCase = new GetCommentUseCase(
    commentsQueryRepository
);

export const commentsController = new CommentsController(
    createCommentUseCase,
    updateCommentUseCase,
    deleteCommentUseCase,
    getCommentUseCase
);