import { Request, Response } from 'express'
import { Empresa } from '../../entities/Classes/Empresa'
import { Responses } from '../../lib/response'
import { HandleEmpresa } from '../../useCases/empresa/Handle'

export class PostController{
    async handle(req: Request, res: Response){
        const response = new Responses()
        try {
            const { name } = req.body;
            if(!name) return response.ParamsError(res, "Nome é obrigatório.")
            const handle = new HandleEmpresa();
            const createdEmpresa: Promise<Empresa> = handle.post(name);
            return response.res200(res, createdEmpresa, "Empresa registrada com sucesso.");
        } catch (e) {
            return response.InternalError(res, e);
        }
    }
}