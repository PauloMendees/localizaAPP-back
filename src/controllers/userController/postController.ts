import { Prisma } from '@prisma/client';
import { Request, Response } from 'express'
import { HandleUser } from '../../useCases/user/Handle';

export class PostUser {
    async handle(req: Request, res: Response) {
        try {
            const { email, password, confirmPassword } = req.body

            const handleUser = new HandleUser()

            const createdUser = await handleUser.postUser(email, password, confirmPassword)

            if(createdUser.error){
                return res.status(createdUser.code).json({
                    error: createdUser.error,
                    message: createdUser.message,
                    data: createdUser.message
                })
            }

            return res.status(200).json({
                error: false,
                message: "Usuário criado com sucesso.",
                data: createdUser.data
            })
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    return res.status(406).json({
                        error: true,
                        message: "Email já cadastrado."
                    });
                }
            }
            return res.status(500).json({
                error: true,
                message: "Erro interno de servidor, favor contate o suporte.",
                data: error
            })
        }
    }
}