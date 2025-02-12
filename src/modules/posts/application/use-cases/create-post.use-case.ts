import {BlogsQueryRepository} from "../../../blogs/infrastructure/repositories/blogs-query.repository";
import {PostsCommandRepository} from "../../infrastructure/repositories/posts-command.repository";
import {PostCreateDTO, PostViewModel} from "../../domain/interfaces/post.interface";
import {Result} from "../../../../shared/infrastructures/result";
import {PostEntity} from "../../domain/post.entity";

export class CreatePostUseCase {
    constructor(
        private blogsQueryRepository: BlogsQueryRepository,
        private postsCommandRepository: PostsCommandRepository
    ) {}

    async execute(dto: PostCreateDTO): Promise<Result<PostViewModel>> {
        const blog = await this.blogsQueryRepository.findById(dto.blogId);
        if (!blog) {
            return Result.fail('Blog not found');
        }

        const post = PostEntity.create({
            ...dto,
            blogName: blog.name
        });

        await this.postsCommandRepository.create(post.toDatabaseModel());
        return Result.ok(post.toViewModel());
    }
}