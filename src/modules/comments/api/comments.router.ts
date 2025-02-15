import {Router} from "express";
import {postsRouter} from "../../posts/api/posts.router";
import {commentValidation} from "./comments-validation.middleware";
import {handleValidationErrors} from "../../../shared/infrastructures/middlewares/error-handler.middleware";
import {commentsController} from "../../../configs/compositions/comments.composition";
import {jwtAuthMiddleware} from "../../../shared/infrastructures/middlewares/jwt-auth.middleware";

export const commentsRouter = Router();

postsRouter.post('/:postId/comments',
    jwtAuthMiddleware,
    commentValidation,
    handleValidationErrors,
    commentsController.createComment
);

commentsRouter.put('/:commentId',
    jwtAuthMiddleware,
    commentValidation,
    handleValidationErrors,
    commentsController.updateComment
);

commentsRouter.delete('/:commentId',
    jwtAuthMiddleware,
    commentsController.deleteComment
);

commentsRouter.get('/:commentId',
    commentsController.getComment
);