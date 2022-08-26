import { Prisma } from '@prisma/client'
import { Request, Response } from 'express'
import { Responses } from '../../../lib/response'
import { UpdateUseCase } from '../../../useCases/item/UpdateUseCase';

export class PutController{
    constructor(
        private responses: Responses,
        private useCase: UpdateUseCase
    ){}

    async handle(req: Request, res: Response){
        const authToken = req.headers.authorization;
        if(!authToken) return res.status(401).json({
            error: true,
            message: "Você não tem permissão para realizar essa ação."
        })
        try {
            const { andar, codigo_de_barras, descricao, dono, lido, localizacao, plaqueta, sequencial_localiza, tipo } = req.body
            const { id } = req.params

            const data = await this.useCase.execute(id, {
                andar,
                codigo_de_barras,
                descricao,
                dono,
                lido,
                localizacao,
                plaqueta,
                sequencial_localiza,
                tipo
            }, authToken)

            if(data.error) return this.responses.ParamsError(res, data.message)
            return this.responses.res200(res, data, "Item alterado com sucesso.")
        } catch (e) {
            if (e instanceof Prisma.PrismaClientKnownRequestError) {
                if (e.code === 'P2025') {
                    return this.responses.NotFound(res, "Item não encontrado.");
                }else{
                    return this.responses.InternalError(res, e)
                }
            }
        }
    }
}