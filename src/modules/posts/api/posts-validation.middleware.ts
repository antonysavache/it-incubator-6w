import {body} from 'express-validator';
import {blogsQueryRepository} from "../../../configs/compositions/repositories";

export const postsValidation = [
    body('title')
        .trim()
        .notEmpty().withMessage('Title is required')
        .isLength({ max: 30 }).withMessage('Title should not exceed 30 characters'),

    body('shortDescription')
        .trim()
        .notEmpty().withMessage('Short description is required')
        .isLength({ max: 100 }).withMessage('Short description should not exceed 100 characters'),

    body('content')
        .trim()
        .notEmpty().withMessage('Content is required')
        .isLength({ max: 1000 }).withMessage('Content should not exceed 1000 characters'),

    body('blogId')
        .custom(async value => {
            const blog = await blogsQueryRepository.findById(value);
            if (!blog) {
                throw new Error('Blog not found');
            }
            return true;
        })
];