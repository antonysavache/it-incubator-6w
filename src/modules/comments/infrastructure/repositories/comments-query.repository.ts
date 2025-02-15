import {BaseQueryRepository} from "../../../../shared/infrastructures/repositories/base-query.repository";
import {CommentDatabaseModel, CommentViewModel} from "../../domain/interfaces/comment.interface";

export class CommentsQueryRepository extends BaseQueryRepository<CommentDatabaseModel> {
    constructor() {
        super('comments');
    }

    async findByPostId(postId: string): Promise<({ id: string } & {
        postId: string;
        content: string;
        userId: string;
        userLogin: string;
        createdAt: string
    })[]> {
        this.checkInit();
        const comments = await this.collection.find({ postId }).toArray();
        return comments.map(comment => this.toViewModel(comment));
    }
}