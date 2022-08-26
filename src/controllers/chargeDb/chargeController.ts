import { Prisma } from '@prisma/client';
import { Request, Response } from 'express'
import { Responses } from '../../lib/response'
import { IChargeDataBaseUseCase } from '../../useCases/chargeDataBase/IChargeDataBaseUseCase';

export class ChargeController {
    constructor(
        private responses: Responses,
        private chargeUseCase: IChargeDataBaseUseCase
    ){}

    async handle(req: Request, res: Response){
        const authToken = req.headers.authorization;
        if(!authToken) return res.status(401).json({
            error: true,
            message: "Você não tem permissão para realizar essa ação."
        })
        try {
            const file = req.file;
            if(!file) return this.responses.ParamsError(res, "Arquivo vazio ou não encontrado.")
            const data = await this.chargeUseCase.charge(file, authToken)

            return this.responses.res200(res, data, "Uplaod concluído com sucesso.");
        } catch (e) {
            if (e instanceof Prisma.PrismaClientKnownRequestError) {
                return this.responses.ParamsError(res, "Erro ao salvar no banco de dados, por favor verifique a planilha.")
            }
            return this.responses.InternalError(res, "Ocorreu algum erro interno, contate o suporte.")
        }
    }
}