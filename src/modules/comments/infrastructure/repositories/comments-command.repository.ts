import {BaseCommandRepository} from "../../../../shared/infrastructures/repositories/base-command.repository";
import {CommentCreateModel, CommentDatabaseModel} from "../../domain/interfaces/comment.interface";

export class CommentsCommandRepository extends BaseCommandRepository<CommentDatabaseModel, CommentCreateModel> {
    constructor() {
        super('comments');
    }
}