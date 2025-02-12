import { Router } from 'express';
import {authMiddleware} from "../../../shared/infrastructures/middlewares/auth.middleware";
import {postsController} from "../../../configs/compositions/posts.composition";
import {blogsValidationMiddleware} from "./blogs-validation.middleware";
import {handleValidationErrors} from "../../../shared/infrastructures/middlewares/error-handler.middleware";


export const postsRouter = Router();

postsRouter.get('/', postsController.getPosts);
postsRouter.post('/',
    authMiddleware,
    blogsValidationMiddleware,
    handleValidationErrors,
    postsController.createPost
);
postsRouter.get('/:id', postsController.getPostById);
postsRouter.put('/:id',
    authMiddleware,
    blogsValidationMiddleware,
    handleValidationErrors,
    postsController.updatePost
);
postsRouter.delete('/:id',
    authMiddleware,
    postsController.deletePost
);