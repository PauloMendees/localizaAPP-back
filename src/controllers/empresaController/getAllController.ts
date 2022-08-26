import { Request, Response } from 'express'
import { Empresa } from '../../entities/Classes/Empresa'
import { Responses } from '../../lib/response'
import { HandleEmpresa } from '../../useCases/empresa/Handle'

export class GetAllController {
    async handle(req: Request, res: Response){
        const responses = new Responses()
        try {
            const handleEmpresa = new HandleEmpresa()
            const list: Empresa[] = await handleEmpresa.getAll()

            return responses.res200(res, list, "Empresas buscadas com sucesso.");
        } catch (e) {
            return responses.InternalError(res, e)
        }
    }
}