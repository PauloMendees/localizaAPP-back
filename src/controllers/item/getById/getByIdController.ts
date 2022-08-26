import { Request, Response } from 'express'
import { Responses } from '../../../lib/response';
import { FindByIdUseCase } from '../../../useCases/item/FindByIdUseCase';

export class GetByIdController {
    constructor(
        private responses: Responses,
        private useCase: FindByIdUseCase
    ){}

    async handle(req: Request, res: Response) {
        const authToken = req.headers.authorization;
        if(!authToken) return res.status(401).json({
            error: true,
            message: "Você não tem permissão para realizar essa ação."
        })
        try {
            const { id } = req.params

            const item = await this.useCase.execute(id as string, authToken);
            
            if(item) return this.responses.res200(res, item, "Item buscado com sucesso.");
            return this.responses.NotFound(res, "Item não encontrado.")

        } catch (e) {
            return this.responses.InternalError(res);
        }
    }
}