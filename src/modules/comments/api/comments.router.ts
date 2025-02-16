import { Router } from "express";
import { commentValidation } from "./comments-validation.middleware";
import { handleValidationErrors } from "../../../shared/infrastructures/middlewares/error-handler.middleware";
import { commentsController } from "../../../configs/compositions/comments.composition";
import { jwtAuthMiddleware } from "../../../shared/infrastructures/middlewares/jwt-auth.middleware";

export const commentsRouter = Router();

commentsRouter.post('/posts/:postId/comments',
    jwtAuthMiddleware,
    commentValidation,
    handleValidationErrors,
    commentsController.createComment
);

commentsRouter.get('/posts/:postId/comments',
    commentsController.getComments
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