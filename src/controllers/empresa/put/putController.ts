import { Prisma } from '@prisma/client'
import { Request, Response } from 'express'
import { Responses } from '../../../lib/response'
import { UpdateUseCase } from '../../../useCases/empresa/UpdateUseCase'

export class PutController {
    constructor(
        private responses: Responses,
        private useCase: UpdateUseCase
    ){}
    async handle(req: Request, res: Response){
        try {
            const { name } = req.body
            const { id } = req.params

            const updatedEmpresa = await this.useCase.execute(id, name);

            return this.responses.res200(res, updatedEmpresa, "Empresa atualizada com sucesso.");
        } catch (e) {
            if (e instanceof Prisma.PrismaClientKnownRequestError) {
                if (e.code === 'P2025') {
                    return this.responses.NotFound(res, "Empresa não encontrada.");
                }else{
                    return this.responses.InternalError(res, e)
                }
            }
        }
    }
}