import { Prisma } from '@prisma/client'
import { Request, Response } from 'express'
import { Responses } from '../../../lib/response'
import { DeleteUseCase } from '../../../useCases/empresa/DeleteUseCase'

export class DeleteController {
    constructor(
        private responses: Responses,
        private useCase: DeleteUseCase
    ){}

    async handle(req: Request, res: Response){
        try {
            const { id } = req.params
            await this.useCase.execute(id);

            return this.responses.res200(res, [], "Empresa deletada com sucesso.");
        } catch (e) {
            if (e instanceof Prisma.PrismaClientKnownRequestError) {
                if (e.code === 'P2025') {
                    return this.responses.NotFound(res, "Empresa não encontrada.")
                } else {
                    return this.responses.InternalError(res)
                }
            }
        }
    }
}