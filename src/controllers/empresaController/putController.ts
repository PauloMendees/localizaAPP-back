import { Prisma } from '@prisma/client'
import { Request, Response } from 'express'
import { Responses } from '../../lib/response'
import { HandleEmpresa } from '../../useCases/empresa/Handle'

export class PutController {
    async handle(req: Request, res: Response){
        const responses = new Responses()
        try {
            const { name } = req.body
            const { id } = req.params

            const handle = new HandleEmpresa()

            const updatedEmpresa = await handle.put(id, name);

            return responses.res200(res, updatedEmpresa, "Empresa atualizada com sucesso.");
        } catch (e) {
            if (e instanceof Prisma.PrismaClientKnownRequestError) {
                if (e.code === 'P2025') {
                    return responses.NotFound(res, "Empresa não encontrada.");
                }else{
                    return responses.InternalError(res, e)
                }
            }
        }
    }
}