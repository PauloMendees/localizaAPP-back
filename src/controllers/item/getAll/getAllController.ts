import { Request, Response } from 'express'
import { Responses } from '../../../lib/response';
import { ListUseCase } from '../../../useCases/item/ListUseCase';

export class GetAllController {
    constructor(
        private responses: Responses,
        private useCase: ListUseCase
    ){}

    async handle(req: Request, res: Response) {
        const authToken = req.headers.authorization;
        if(!authToken) return res.status(401).json({
            error: true,
            message: "Você não tem permissão para realizar essa ação."
        })
        try {
            const list = await this.useCase.execute(authToken)

            return this.responses.res200(res, list, "Listas buscadas com sucesso.")
        } catch (e) {
            return this.responses.InternalError(res);
        }
    }
}