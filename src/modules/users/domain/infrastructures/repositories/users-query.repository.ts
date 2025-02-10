import {UserDatabaseModel} from "../../interfaces/user.interface";
import {BaseQueryRepository} from "../../../../../shared/infrastructures/repositories/base-query.repository";

export class UsersQueryRepository extends BaseQueryRepository<UserDatabaseModel> {
    constructor() {
        super('users');
    }

    async findByFilter(filter: { login?: string, email?: string }): Promise<UserDatabaseModel | null> {
        this.checkInit();

        const searchConditions = [];

        if (filter.login) {
            searchConditions.push({ login: filter.login });
        }

        if (filter.email) {
            searchConditions.push({ email: filter.email });
        }

        if (searchConditions.length === 0) {
            return null;
        }

        return this.collection.findOne({
            $or: searchConditions
        });
    }
}