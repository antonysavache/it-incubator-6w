import { DEFAULT_QUERY_PARAMS, PageResponse, QueryParams, SearchParam } from "../../../../shared/models/common.model";
import {UsersQueryRepository} from "../../domain/infrastructures/repositories/users-query.repository";
import {UserViewModel} from "../../domain/interfaces/user.interface";

export class GetUsersUseCase {
    constructor(private usersQueryRepository: UsersQueryRepository) {}

    async execute(params: QueryParams): Promise<PageResponse<UserViewModel>> {
        return this.usersQueryRepository.findAll({
            searchParams: this.buildSearchParams(params),
            sortBy: params.sortBy || DEFAULT_QUERY_PARAMS.sortBy,
            sortDirection: params.sortDirection || DEFAULT_QUERY_PARAMS.sortDirection,
            pageNumber: params.pageNumber || DEFAULT_QUERY_PARAMS.pageNumber,
            pageSize: params.pageSize || DEFAULT_QUERY_PARAMS.pageSize
        });
    }

    private buildSearchParams(params: QueryParams): SearchParam[] {
        const searchParams: SearchParam[] = [];

        if (params.searchLoginTerm) {
            searchParams.push({
                fieldName: 'login',
                value: params.searchLoginTerm
            });
        }

        if (params.searchEmailTerm) {
            searchParams.push({
                fieldName: 'email',
                value: params.searchEmailTerm
            });
        }

        return searchParams;
    }
}