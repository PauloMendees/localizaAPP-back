import { Prisma } from '@prisma/client'
import { Request, Response } from 'express'
import { Responses } from '../../lib/response'
import { HandleEmpresa } from '../../useCases/empresa/Handle'

export class DeleteController {
    async handle(req: Request, res: Response){
        const responses = new Responses()
        try {
            const { id } = req.params
            const handle = new HandleEmpresa()
            await handle.delete(id);

            return responses.res200(res, [], "Empresa deletada com sucesso.");
        } catch (e) {
            if (e instanceof Prisma.PrismaClientKnownRequestError) {
                if (e.code === 'P2025') {
                    return responses.NotFound(res, "Empresa não encontrada.")
                } else {
                    return responses.InternalError(res)
                }
            }
        }
    }
}