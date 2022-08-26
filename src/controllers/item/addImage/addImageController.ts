import { Prisma } from '@prisma/client'
import { Request, Response } from 'express'
import { Responses } from '../../../lib/response';
import { AddImageUseCase } from '../../../useCases/item/AddImageUseCase'

export class AddImageController{
    constructor(
        private responses: Responses,
        private useCase: AddImageUseCase
    ){}

    async handle(req: Request, res: Response){
        const authToken = req.headers.authorization;
        if(!authToken) return res.status(401).json({
            error: true,
            message: "Você não tem permissão para realizar essa ação."
        })
        try {
            const { foto_url } = req.body
            const { id } = req.params

            const data = await this.useCase.execute(id, foto_url, authToken);
            
            if(data.error) return this.responses.ParamsError(res, data.message)
            return this.responses.res200(res, data, "Foto adicionada com sucesso.")
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