import { Request, Response } from 'express'
import { Empresa } from '../../../entities/Classes/Empresa'
import { Responses } from '../../../lib/response'
import { ListUseCase } from '../../../useCases/empresa/ListUsecase'

export class GetAllController {
    constructor(
        private responses: Responses,
        private useCase: ListUseCase
    ){}

    async handle(req: Request, res: Response){
        try {
            const list: Empresa[] = await this.useCase.execute();

            return this.responses.res200(res, list, "Empresas buscadas com sucesso.");
        } catch (e) {
            return this.responses.InternalError(res, e)
        }
    }
}