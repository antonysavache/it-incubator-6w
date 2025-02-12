import { Request, Response } from 'express';
import { CreateUserUseCase } from "../application/use-cases/create-user.use-case";
import { GetUsersUseCase } from "../application/use-cases/get-users.use-case";
import { QueryParams } from "../../../shared/models/common.model";

export class UsersController {
    constructor(
        private createUserUseCase: CreateUserUseCase,
        private getUsersUseCase: GetUsersUseCase
    ) {}

    getUsers = async (req: Request<{}, {}, {}, QueryParams>, res: Response) => {
        const users = await this.getUsersUseCase.execute(req.query);
        return res.status(200).json(users);
    }

    createUser = async (req: Request, res: Response) => {
        const result = await this.createUserUseCase.execute(req.body);

        if (result.isFailure()) {
            return res.status(400).json({
                errorsMessages: [{
                    message: result.getError(),
                    field: 'none'
                }]
            });
        }

        return res.status(201).json(result.getValue());
    }
}