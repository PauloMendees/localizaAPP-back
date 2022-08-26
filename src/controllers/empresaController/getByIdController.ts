import { Request, Response } from 'express'
import { Empresa } from '../../entities/Classes/Empresa'
import { Responses } from '../../lib/response'
import { HandleEmpresa } from '../../useCases/empresa/Handle'

export class GetByIdController {
    async handle(req: Request, res: Response) {
        const responses = new Responses()
        try {
            const { id } = req.params
            const handle = new HandleEmpresa()

            const empresa: Empresa | null = await handle.getById(id)

            if(empresa === null) return responses.NotFound(res, "Empresa não encontrada.")
            return responses.res200(res, empresa, "Empresa buscada com sucesso.");
        } catch (e) {
            return responses.InternalError(res, e)
        }
    }
}