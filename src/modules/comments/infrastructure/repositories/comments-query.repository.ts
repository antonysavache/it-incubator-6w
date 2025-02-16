import { BaseQueryRepository } from "../../../../shared/infrastructures/repositories/base-query.repository";
import { CommentDatabaseModel, CommentViewModel, CommentFullViewModel } from "../../domain/interfaces/comment.interface";
import {ObjectId, WithId} from "mongodb";

export class CommentsQueryRepository extends BaseQueryRepository<CommentDatabaseModel> {
    constructor() {
        super('comments');
    }

    private toFullViewModel(model: WithId<CommentDatabaseModel>): CommentFullViewModel {
        return {
            id: model._id.toString(),
            content: model.content,
            commentatorInfo: {
                userId: model.userId,
                userLogin: model.userLogin
            },
            createdAt: model.createdAt,
            postId: model.postId,
            userId: model.userId,
            userLogin: model.userLogin
        };
    }

    private toPublicViewModel(model: WithId<CommentDatabaseModel>): CommentViewModel {
        return {
            id: model._id.toString(),
            content: model.content,
            commentatorInfo: {
                userId: model.userId,
                userLogin: model.userLogin
            },
            createdAt: model.createdAt
        };
    }

    protected override toViewModel(model: WithId<CommentDatabaseModel>) {
        return this.toFullViewModel(model);
    }

    async findById(id: string): Promise<CommentFullViewModel | null> {
        this.checkInit();
        const result = await this.collection.findOne({ _id: new ObjectId(id) });
        return result ? this.toFullViewModel(result) : null;
    }

    async findByPostId(postId: string): Promise<CommentViewModel[]> {
        this.checkInit();
        const comments = await this.collection.find({ postId }).toArray();
        return comments.map(comment => this.toPublicViewModel(comment));
    }

    async findPublicById(id: string): Promise<CommentViewModel | null> {
        this.checkInit();
        const result = await this.collection.findOne({ _id: new ObjectId(id) });
        return result ? this.toPublicViewModel(result) : null;
    }
}