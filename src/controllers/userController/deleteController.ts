//Controller to delete user
import { Prisma } from '@prisma/client';
import { Request, Response } from 'express'
import { HandleUser } from '../../useCases/user/Handle';

export class DeleteUser {
    async handle(req: Request, res: Response) {
        try {
            const { id } = req.params

            const handleUser = new HandleUser()
            await handleUser.deleteUser(id)
            
            return res.status(200).json({
                error: false,
                message: "Usuário deletado com sucesso.",
                data: "Usuário deletado com sucesso."
            })
        } catch (e) {
            if (e instanceof Prisma.PrismaClientKnownRequestError) {
                if (e.code === 'P2025') {
                    return res.status(404).json({
                        error: true,
                        message: "Usuário não encontrado.",
                        data: e
                    });
                } else {
                    return res.status(500).json({
                        error: true,
                        message: "Erro interno de servidor, favor contate o suporte.",
                        data: e
                    });
                }
            }
        }
    }
}