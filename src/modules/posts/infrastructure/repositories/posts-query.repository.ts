import { PostDatabaseModel } from "../../domain/interfaces/post.interface";
import {BaseQueryRepository} from "../../../../shared/infrastructures/repositories/base-query.repository";

export class PostsQueryRepository extends BaseQueryRepository<PostDatabaseModel> {
    constructor() {
        super('posts');
    }
}