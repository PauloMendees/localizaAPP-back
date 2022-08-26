import { Prisma } from '@prisma/client'
import { Request, Response } from 'express'
import { Responses } from '../../lib/response'
import { HandleUser } from '../../useCases/user/Handle'

export class VinculateUser {
    async handle(req: Request, res: Response) {
        const responses = new Responses()
        const handleUser = new HandleUser()

        const { idEmpresa } = req.body
        const { id } = req.params

        try {
            const responseData = await handleUser.vinculateEmpresa(id, idEmpresa)

            if (responseData.error) {
                return responses.ParamsError(res, responseData.message)
            }

            return responses.res200(res, responseData, responseData.message)
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