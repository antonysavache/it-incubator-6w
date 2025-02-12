import {PostsQueryRepository} from "../../modules/posts/infrastructure/repositories/posts-query.repository";
import {PostsCommandRepository} from "../../modules/posts/infrastructure/repositories/posts-command.repository";
import {BlogsQueryRepository} from "../../modules/blogs/infrastructure/repositories/blogs-query.repository";
import {PostsController} from "../../modules/posts/api/posts.controller";
import {GetPostsUseCase} from "../../modules/posts/application/use-cases/get-posts.use-case";
import {CreatePostUseCase} from "../../modules/posts/application/use-cases/create-post.use-case";
import {GetPostByIdUseCase} from "../../modules/posts/application/use-cases/get-post-by-id.use-case";
import {UpdatePostUseCase} from "../../modules/posts/application/use-cases/update-post.use-case";
import {DeletePostUseCase} from "../../modules/posts/application/use-cases/delete-post.use-case";

// Repositories
export const postsQueryRepository = new PostsQueryRepository();
export const postsCommandRepository = new PostsCommandRepository();
export const blogsQueryRepository = new BlogsQueryRepository();

// Use Cases
export const getPostsUseCase = new GetPostsUseCase(postsQueryRepository);
export const createPostUseCase = new CreatePostUseCase(blogsQueryRepository, postsCommandRepository);
export const getPostByIdUseCase = new GetPostByIdUseCase(postsQueryRepository);
export const updatePostUseCase = new UpdatePostUseCase(blogsQueryRepository, postsCommandRepository);
export const deletePostUseCase = new DeletePostUseCase(postsCommandRepository);

// Controller
export const postsController = new PostsController(
    getPostsUseCase,
    createPostUseCase,
    getPostByIdUseCase,
    updatePostUseCase,
    deletePostUseCase
);