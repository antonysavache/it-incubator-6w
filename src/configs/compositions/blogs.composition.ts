import {BlogsQueryRepository} from "../../modules/blogs/infrastructure/repositories/blogs-query.repository";
import {BlogsCommandRepository} from "../../modules/blogs/infrastructure/repositories/blogs-command.repository";
import {PostsQueryRepository} from "../../modules/posts/infrastructure/repositories/posts-query.repository";
import {PostsCommandRepository} from "../../modules/posts/infrastructure/repositories/posts-command.repository";
import {GetBlogsUseCase} from "../../modules/blogs/application/use-cases/get-blogs.use-case";
import {CreateBlogUseCase} from "../../modules/blogs/application/use-cases/create-blog.use-case";
import {GetBlogByIdUseCase} from "../../modules/blogs/application/use-cases/get-blog-by-id.use-case";
import {UpdateBlogUseCase} from "../../modules/blogs/application/use-cases/update-blog.use-case";
import {DeleteBlogUseCase} from "../../modules/blogs/application/use-cases/delete-blog.use-case";
import {GetBlogPostsUseCase} from "../../modules/blogs/application/use-cases/get-blog-posts.use-case";
import {CreateBlogPostUseCase} from "../../modules/blogs/application/use-cases/create-blog-post.use-case";
import {BlogsController} from "../../modules/blogs/api/blogs.controller";

export const blogsQueryRepository = new BlogsQueryRepository();
export const blogsCommandRepository = new BlogsCommandRepository();
export const postsQueryRepository = new PostsQueryRepository();
export const postsCommandRepository = new PostsCommandRepository();

// Use Cases
export const getBlogsUseCase = new GetBlogsUseCase(blogsQueryRepository);
export const createBlogUseCase = new CreateBlogUseCase(blogsCommandRepository);
export const getBlogByIdUseCase = new GetBlogByIdUseCase(blogsQueryRepository);
export const updateBlogUseCase = new UpdateBlogUseCase(blogsCommandRepository);
export const deleteBlogUseCase = new DeleteBlogUseCase(blogsCommandRepository);
export const getBlogPostsUseCase = new GetBlogPostsUseCase(blogsQueryRepository, postsQueryRepository);
export const createBlogPostUseCase = new CreateBlogPostUseCase(blogsQueryRepository, postsCommandRepository);

// Controller
export const blogsController = new BlogsController(
    getBlogsUseCase,
    createBlogUseCase,
    getBlogByIdUseCase,
    updateBlogUseCase,
    deleteBlogUseCase,
    createBlogPostUseCase,
    getBlogPostsUseCase
);