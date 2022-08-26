//Controller to get all user's
import { Request, Response } from 'express'
import { Responses } from '../../../lib/response'
import { ListUsersUseCase } from '../../../useCases/user/ListUsersUseCase'

export class GetAllController {
    constructor(
        private useCase: ListUsersUseCase
    ){}

    async handle(req: Request, res: Response){
        try {
            const data = await this.useCase.execute()

            return res.status(200).json({
                error: false,
                data: data
            })
        } catch (e) {
            return res.status(500).json({
                error: true,
                message: "Erro interno de servidor, favor contate o suporte.",
                data: e
            })
        }
    }
}