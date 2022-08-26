import { Prisma } from '@prisma/client'
import { Request, Response } from 'express'
import { Responses } from '../../../lib/response'
import { VinculateUserUseCase } from '../../../useCases/user/VinculateUserUseCase'

export class VinculateController {
    constructor(
        private responses: Responses,
        private useCase: VinculateUserUseCase
    ){}

    async handle(req: Request, res: Response) {
        const { idEmpresa } = req.body
        const { id } = req.params

        try {
            const responseData = await this.useCase.execute(id, idEmpresa)
            if(!responseData) return;
            if (responseData.error) {
                return this.responses.ParamsError(res, responseData.message)
            }

            return this.responses.res200(res, responseData, responseData.message)
        } catch (e) {
            if (e instanceof Prisma.PrismaClientKnownRequestError) {
                if (e.code === 'P2025') {
                    return res.status(404).json({
                        error: true,
                        message: "Usuário não encontrado."
                    });
                } else {
                    return res.status(500).json({
                        error: true,
                        message: "Erro interno de servidor, contate o suporte."
                    });
                }
            }
        }
    }
}