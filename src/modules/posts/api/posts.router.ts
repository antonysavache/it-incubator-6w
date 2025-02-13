import { Router } from 'express';
import {authMiddleware} from "../../../shared/infrastructures/middlewares/auth.middleware";
import {postsController} from "../../../configs/compositions/posts.composition";
import {handleValidationErrors} from "../../../shared/infrastructures/middlewares/error-handler.middleware";
import {postsValidation} from "./posts-validation.middleware";


export const postsRouter = Router();

postsRouter.get('/', postsController.getPosts);
postsRouter.post('/',
    authMiddleware,
    postsValidation,
    handleValidationErrors,
    postsController.createPost
);
postsRouter.get('/:id', postsController.getPostById);
postsRouter.put('/:id',
    authMiddleware,
    postsValidation,
    handleValidationErrors,
    postsController.updatePost
);
postsRouter.delete('/:id',
    authMiddleware,
    postsController.deletePost
);