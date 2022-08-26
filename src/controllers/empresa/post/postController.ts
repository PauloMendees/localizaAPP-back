import { Request, Response } from 'express'
import { Empresa } from '../../../entities/Classes/Empresa'
import { Responses } from '../../../lib/response'
import { CreateUseCase } from '../../../useCases/empresa/CreateUseCase';

export class PostController{
    constructor(
        private responses: Responses,
        private useCase: CreateUseCase
    ){}

    async handle(req: Request, res: Response){
        try {
            const { name } = req.body;
            if(!name) return this.responses.ParamsError(res, "Nome é obrigatório.")
            const createdEmpresa: Promise<Empresa> = this.useCase.execute(name);
            return this.responses.res200(res, createdEmpresa, "Empresa registrada com sucesso.");
        } catch (e) {
            return this.responses.InternalError(res, e);
        }
    }
}