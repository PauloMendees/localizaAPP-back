//Controller to update/change a user
import { Prisma } from '@prisma/client'
import { Request, Response } from 'express'
import { HandleUser } from '../../useCases/user/Handle'

export class PutUser {
    async handle(req: Request, res: Response){
        try {
            const { id } = req.params
            const { email } = req.body

            const handleUser = new HandleUser()

            const updatedUser = await handleUser.putUser(id, email)

            if(!updatedUser.error){
                return res.status(updatedUser.code).json({
                    error: false,
                    data: updatedUser.data,
                    message: updatedUser.message
                })
            }

            return res.status(406).json({
                error: true,
                message: updatedUser.message,
                data: updatedUser.message
            })
        } catch (e) {
            if (e instanceof Prisma.PrismaClientKnownRequestError) {
                if (e.code === 'P2025') {
                    return res.status(404).json({
                        error: true,
                        message: "Usuário não encontrado."
                    });
                }else{
                    return res.status(500).json({
                        error: true,
                        message: "Erro interno de servidor, contate o suporte."
                    });
                }
            }
        }
    }
}