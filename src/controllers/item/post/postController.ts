import { Request, Response } from 'express'
import { Responses } from '../../../lib/response';
import { CreateUseCase } from '../../../useCases/item/CreateUseCase';

export class PostController{
    constructor(
        private responses: Responses,
        private useCase: CreateUseCase
    ){}

    async handle(req: Request, res: Response){
        const authToken = req.headers.authorization;
        if(!authToken) return res.status(401).json({
            error: true,
            message: "Você não tem permissão para realizar essa ação."
        })
        try {
            const { andar, codigo_de_barras, descricao, dono, lido, localizacao, plaqueta, sequencial_localiza, tipo } = req.body
            const data = await this.useCase.execute({
                andar,
                codigo_de_barras,
                descricao,
                dono,
                lido,
                localizacao,
                plaqueta,
                sequencial_localiza,
                tipo
            }, authToken);

            return this.responses.Created(res, data, "Item registrado com sucesso.");
        } catch (error) {
            return this.responses.InternalError(res, error)
        }
    }
}