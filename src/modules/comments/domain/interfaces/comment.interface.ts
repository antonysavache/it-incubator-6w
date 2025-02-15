import {ObjectId} from "mongodb";

export interface CommentCreateDTO {
    content: string;
}

export interface CommentCreateModel {
    postId: string;
    content: string;
    userId: string;
    userLogin: string;
    createdAt: string;
}

export interface CommentViewModel {
    id: string;
    content: string;
    commentatorInfo: {
        userId: string;
        userLogin: string;
    };
    createdAt: string;
}

export interface CommentDatabaseModel {
    _id: ObjectId;
    postId: string;
    content: string;
    userId: string;
    userLogin: string;
    createdAt: string;
}